import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Col } from 'ionic-angular';

@Injectable()
export class DbSftpProvider
{
    private isOpen: boolean;
    addColumns : any[] ;
    
    public constructor(private storage: SQLite){
        //this.init();
    }  
    
    async init()
    {
        this.createDatabase()
        .then(async isTableCreated => {
            if(isTableCreated)
            {
                this.addColumn();
                await this.alterTable();
                await this.defaultData();
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    createDatabase() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS Sftp
                                            ( 
                                                Id INTEGER Primary Key AUTOINCREMENT
                                                
                                            )`, [])
                .then(() =>
                {
                    resolve(true);
                    
                })
                .catch(err => resolve(false));
                
                //db.close();
                                           
            });
        })
        
    }

    addColumn()
    {
        this.addColumns = [];
        this.addColumns.push({Column : "Username", DataType : "text"})
        this.addColumns.push({Column : "Password", DataType : "text"})
        console.log(this.addColumns)
    }

    async defaultData() {
        //return new Promise((resolve, reject) => {
        this.isDataExist()
        .then(isExist => {
            if(!isExist){
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("Insert into Sftp (Username, Password) values ('testsduser','testsdpassword')", [])
                    .then((data) => {
                        //console.log("insert sftp oke");
                       // resolve(true);
                    }, (error) => {
                        //console.log("insert sftp error", error);
                        //resolve(false);
                    });
                })
                .catch((error) =>
                {
                    //console.log("insert sftp error 2", error);
                    //resolve(false);
                });
            }
        })
        .catch(err => {
            console.error("data not exist sftp", err)
        }) 
        //});
    }
     
    async alterTable()
    {
        for(let i = 0 ; i < this.addColumns.length ; i ++)
        {
            var isColumExist = await this.isColumnExist(this.addColumns[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumns[i].Column;
                var dataType = this.addColumns[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE Sftp ADD COLUMN "+columName+" "+ dataType, [])
                    .then((data) => {
                        console.log("altered");
                    }, (error) => {
                        console.error(error);
                    });
                })
                .catch((error) =>
                {
                    console.error(error);
                });
            }
        }
    }

    public getSftp() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let Sftp = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM Sftp", [])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            Sftp = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).Username,
                                                        data.rows.item(i).Password)
                            
                        }
                    }
                    //console.log(user);
                    resolve(Sftp);
                }, (error) => {
                    reject(error);
                });
            })
            .catch((error) =>
            {
                reject(error);
            });
        });
    }


    public saveSftp(
        Username: string,
        Password: string) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO Sftp (Username, Password) 
                            VALUES (?,?)`, [Username, Password])
            .then((data) => {
                console.log("SQL Insert Execute");
                //resolve(data);
            }, (error) => {
                //reject(error);
            });
        });
    }

    async updateSftpColumn(Column : string, Value : any)
    {
       var isExist = await this.isDataExist();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE Sftp set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO Sftp("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        
    }
    
    createObject(Id : number,
        Username: string,
        Password: string,
        IpAddress : string = null,
            ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "Username" : Username, 
            "Password" : Password, 
            "IpAddress" : IpAddress
        }

        return object;
    }

    isDataExist() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
            let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM Sftp", [])
                .then((data) => {
                    console.log(data);
                    if(data.rows.length > 0) {
                        isExist = true;
                    }
                    //console.log(user);
                    resolve(isExist);
                }, (error) => {
                    reject(error);
                });
            })
            .catch((error) =>
            {
                reject(error);
            });
        });
    }

    isColumnExist(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from Sftp where 1 = 2", [])
                .then((data) => {
                    // console.log("check column");
                    // if(data.rows.length > 0) {
                    //     isExist = true;
                    // }
                    //console.log(columnName + "exist");
                    resolve(true);
                }, (error) => {
                    //
                    //console.log(columnName + "not exist");
                    resolve(false);
                });
            })
            .catch((error) =>
            {
                console.error(error);
                reject(error);
            });
        });
    }

    async deleteSftp(){
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`DELETE FROM Sftp`, [])
            .then((data) => {
                console.log("Delete Execute");
                //resolve(data);
            })
            .catch((error) =>
            {
                console.error(error);
            });
        });
    }

}