import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbServerProvider{
    addColumnsServer : any[] ;
    public constructor(private storage: SQLite){
        //this.init();
    }  

    async init(){
        
         //Database Server
         this.createDatabaseServer()
         .then(async result => {
            if(result){
                this.addColumnServer();
                await this.alterTableServer();
                //await this.deleteServer();
                await this.defaultData();
                await this.updateData();
            }
         })
         .catch(err => {
             console.error(err);
         });

    }

    //Server
    createDatabaseServer() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS Server
                                            ( 
                                                Id INTEGER Primary Key AUTOINCREMENT
                                                
                                            )`, [])
                .then(() =>
                {
                    resolve(true);
                    
                })
                .catch(err => resolve(false));
                      
            });
        })
        
    }

    addColumnServer()
    {
        this.addColumnsServer = [];
        this.addColumnsServer.push({Column : "ServerIP", DataType : "varchar(20)"});
        this.addColumnsServer.push({Column : "ServerPort", DataType : "varchar(4)"});
        //console.log(this.addColumnsServer)
    }

    async defaultData() {
        //return new Promise((resolve, reject) => {
        this.isDataExistServer()
        .then(isExist => {
            if(!isExist){
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("Insert into Server (serverIP, ServerPort) values ('www.bsscloud.com.au', '8181')", [])
                    .then((data) => {
                        //console.log("insert server yes");
                        //resolve(true);
                    }, (error) => {
                        //console.log("insert server error", error);
                        //resolve(false);
                    });
                })
                .catch((error) =>
                {
                    //console.log("insert server error 2", error);
                   //resolve(false);
                });
            }
        })
        .catch(err => {
            console.error("data not exist", err)
        }) 
        //});
    }

    async updateData() {
        //return new Promise((resolve, reject) => {
        this.isDataExistServer()
        .then(isExist => {
            if(isExist){
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("Update Server set ServerPort = ?", ['8080'])
                    .then((data) => {
                        //console.log("insert server yes");
                        //resolve(true);
                    }, (error) => {
                        //console.log("insert server error", error);
                        //resolve(false);
                    });
                })
                .catch((error) =>
                {
                    //console.log("insert server error 2", error);
                   //resolve(false);
                });
            }
        })
        .catch(err => {
            console.error("", err)
        }) 
        //});
    }

    public getServer() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM Server", [])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObjectServer(data.rows.item(i).Id,
                                                        data.rows.item(i).ServerIP,
                                                        data.rows.item(i).ServerPort);
                        }
                    }
                    //console.log(user);
                    resolve(demoSetting);
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

    async alterTableServer()
    {
        for(let i = 0 ; i < this.addColumnsServer.length ; i ++)
        {
            var isColumExist = await this.isColumnExistServer(this.addColumnsServer[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumnsServer[i].Column;
                var dataType = this.addColumnsServer[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE Server ADD COLUMN "+columName+" "+ dataType, [])
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
    
    async saveServer(
        ServerIP: string, 
        ServerPort: string) 
    {
        return new Promise(async (resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql(`INSERT INTO Server (ServerIP,
                                                    ServerPort) 
                                VALUES (?, ?)`, [ServerIP, 
                                    ServerPort])
                .then((data) => {
                    console.log("Server Insert Execute");
                    resolve(true);
                })
                .catch((error) =>
                {
                    resolve(false);
                    console.error(error);
                });
            });
        });
    }

    async updateServer(Column : string, Value : any)
    {
        
        //return new Promise(async (resolve, reject) => {
            var isExist = await this.isDataExistServer();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE Server set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO Server ("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    return true;
                }, (error) => {
                    return false;
                });
            })
            .catch(err => {
                return false
            });

            return false;
        //});
    }

    isColumnExistServer(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from Server where 1 = 2", [])
                .then((data) => {
                    resolve(true);
                }, (error) => {
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

    createObjectServer(Id : number, 
        ServerIP: string, 
        ServerPort: string
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "ServerIP" : ServerIP,
            "ServerPort" : ServerPort
        }

        return object;
    }

    isDataExistServer() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
                let isExist = false;
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM Server", [])
                    .then((data) => {
                        console.log(data);
                        if(data.rows.length > 0) {
                            isExist = true;
                        }
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

    async deleteServer(){
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`DELETE FROM Server`, [])
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