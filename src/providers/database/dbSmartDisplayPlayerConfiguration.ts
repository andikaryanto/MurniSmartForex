import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbSmartDisplayPlayerConfigurationProvider{
    
    addColumnsSmartDisplayPlayerConfiguration : any[] ;
    
    public constructor(private storage: SQLite){
        //this.init();
    } 

    async init(){
         //Database SmartDisplayPlayerConfiguration
         this.createDatabaseSmartDisplayPlayerConfiguration()
         .then(async result => {
            if(result){
                this.addColumnSmartDisplayPlayerConfiguration();
                await this.alterTableSmartDisplayPlayerConfiguration();
            }
         })
         .catch(err => {
             console.error(err);
         });

    }

    //SmartDisplayPlayerConfiguration
    createDatabaseSmartDisplayPlayerConfiguration() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS SmartDisplayPlayerConfiguration
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

    addColumnSmartDisplayPlayerConfiguration()
    {
        this.addColumnsSmartDisplayPlayerConfiguration = [];
        this.addColumnsSmartDisplayPlayerConfiguration.push({Column : "LayoutOrientation", DataType : "int"});
        this.addColumnsSmartDisplayPlayerConfiguration.push({Column : "LayoutContain", DataType : "int"});
        this.addColumnsSmartDisplayPlayerConfiguration.push({Column : "LayoutTemplate", DataType : "int"});
        //console.log(this.addColumnsSmartDisplayPlayerConfiguration)
    }

    public getSmartDisplayPlayerConfiguration() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM SmartDisplayPlayerConfiguration where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObjectSmartDisplayPlayerConfiguration(data.rows.item(i).Id,
                                                        data.rows.item(i).LayoutOrientation,
                                                        data.rows.item(i).LayoutContain, 
                                                        data.rows.item(i).LayoutTemplate);
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

    async alterTableSmartDisplayPlayerConfiguration()
    {
        for(let i = 0 ; i < this.addColumnsSmartDisplayPlayerConfiguration.length ; i ++)
        {
            var isColumExist = await this.isColumnExistSmartDisplayPlayerConfiguration(this.addColumnsSmartDisplayPlayerConfiguration[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumnsSmartDisplayPlayerConfiguration[i].Column;
                var dataType = this.addColumnsSmartDisplayPlayerConfiguration[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE SmartDisplayPlayerConfiguration ADD COLUMN "+columName+" "+ dataType, [])
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
    
    async saveSmartDisplayPlayerConfiguration(
        LayoutOrientation: number, 
        LayoutContain: number, 
        LayoutTemplate : number ) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO SmartDisplayPlayerConfiguration (LayoutOrientation, 
                                                    LayoutContain, 
                                                    LayoutTemplate) 
                            VALUES (?, ?, ?)`, [LayoutOrientation, 
                                                    LayoutContain, 
                                                    LayoutTemplate])
            .then((data) => {
                console.log("player conf SQL Insert Execute");
                //resolve(data);
            })
            .catch((error) =>
            {
                console.error(error);
            });
        });
    }

    async updateSmartDisplayPlayerConfiguration(Column : string, Value : any)
    {
       var isExist = await this.isDataExistSmartDisplayPlayerConfiguration();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE SmartDisplayPlayerConfiguration set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO SmartDisplayPlayerConfiguration ("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        
    }

    isColumnExistSmartDisplayPlayerConfiguration(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from SmartDisplayPlayerConfiguration where 1 = 2", [])
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

    createObjectSmartDisplayPlayerConfiguration(Id : number, 
        LayoutOrientation: number, 
        LayoutContain: number, 
        LayoutTemplate : number
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "LayoutOrientation" : LayoutOrientation,
            "LayoutContain" : LayoutContain,
            "LayoutTemplate" : LayoutTemplate
        }

        return object;
    }

    isDataExistSmartDisplayPlayerConfiguration() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
                let isExist = false;
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM SmartDisplayPlayerConfiguration where Id = 1", [])
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
}