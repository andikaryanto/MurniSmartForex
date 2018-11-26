import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider
{
    
    private isOpen: boolean;

    //private db: SQLiteObject;
    public constructor(
        private storage: SQLite) {
        // if(!this.isOpen) {
        //     // this.storage = new SQLite();
        //     this.storage.create({
        //         name: 'data.db',
        //         location: 'default'
        //     })
        //     .then((db: SQLiteObject) => {
        //         //this.db = db;
        //         db.executeSql(`CREATE TABLE IF NOT EXISTS UserAcount 
        //                                 (LoginName VARCHAR(32), LoginUse int, UserId int, LoggedIn Bit)`, []);
        //         this.isOpen = true; 
        //     })
        //     .catch(e => console.log(e));
        // }
        this.init();
        
    }

    init()
    {
        this.createDatabaseUser();
    }

    public createDatabaseUser(){
        this.storage.create({
            name: 'data.db',
            location: 'default'
        }).
        then((db: SQLiteObject)=>{
            db.executeSql(`CREATE TABLE IF NOT EXISTS UserAcount 
                                        (LoginName VARCHAR(32), LoginUse int, UserId int, LoggedIn Bit)`, []);
                                        //console.log("Database Created");
            //db.close();
        });
    }

    public getUser() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let user = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                //console.log("masuk get user");
                this.createDatabaseUser();
                db.executeSql("SELECT * FROM UserAcount", [])
                .then((data) => {
                    console.log(data);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            user = this.createObject(data.rows.item(i).LoginName, 
                                                        data.rows.item(i).LoginUse,
                                                        data.rows.item(i).UserId,
                                                        data.rows.item(i).LoggedIn)
                            // user.push({
                            //     LoginName: data.rows.item(i).LoginName,
                            //     LoginUse: data.rows.item(i).LoginUse,
                            //     UserId: data.rows.item(i).UserId,
                            //     LoggedIn: data.rows.item(i).UserId
                            // });
                        }
                    }
                    //console.log(user);
                    resolve(user);
                }, (error) => {
                    reject(error);
                });
                //db.close();
            })
            .catch((error) =>
            {
                reject(error);
            });
        });
    }

    public createUser(LoginName: string, LoginUse: number, UserId : number , LoggedIn : boolean) {
        //return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("INSERT INTO UserAcount VALUES (?, ?, ?, ?)", [LoginName, LoginUse, UserId, LoggedIn])
                .then((data) => {
                    console.log("SQL Insert Execute");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        //});
    }

    deleteUser()
    {
        
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql("DELETE FROM UserAcount", [])
            .then((data) => {
                console.log("SQL Delete Execute");
                //resolve(data);
            }, (error) => {
                //reject(error);
            });
        })
        .catch((err) => 
        {
            console.error(err);
        });
    }
    
    createObject(LoginName: string, LoginUse: number, UserId : number , LoggedIn : boolean) : {}
    {
        let user = {};
        user = {
            "LoginName" : LoginName,
            "LoginUse" : LoginUse,
            "UserId" : UserId,
            "LoggedIn" : LoggedIn
        }

        return user;
    }

}