import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Col } from 'ionic-angular';

@Injectable()
export class DbLanguageProvider
{
    
    private isOpen: boolean;
    addColumns : any[] ;
    
    public constructor(private storage: SQLite){
        this.init();
    }  
    
    async init()
    {
        var isTableCreated = await this.createDatabase();
        if(isTableCreated)
        {
            this.addColumn();
            this.alterTable();
        }
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
                db.executeSql(`CREATE TABLE IF NOT EXISTS Language
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
        this.addColumns.push({Column : "Language", DataType : "int"})
        console.log(this.addColumns)
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
                    db.executeSql("ALTER TABLE Language ADD COLUMN "+columName+" "+ dataType, [])
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

    public getLanguage() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let Language = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM Language where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            Language = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).Language)
                            
                        }
                    }
                    //console.log(user);
                    resolve(Language);
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


    public saveLanguage(
        Language: number) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO Language (Language) 
                            VALUES (?)`, [Language])
            .then((data) => {
                console.log("SQL Insert Execute");
                //resolve(data);
            }, (error) => {
                //reject(error);
            });
        });
    }

    async updateLanguageColumn(Column : string, Value : any)
    {
       var isExist = await this.isDataExist();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE Language set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO Language("+Column+") Values(?)";
                    
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
        Language: number
            ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "Language" : Language
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
                db.executeSql("SELECT * FROM Language where Id = 1", [])
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
                db.executeSql("SELECT "+columnName+" from Language where 1 = 2", [])
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

}