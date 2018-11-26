import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Col } from 'ionic-angular';

@Injectable()
export class DbSmartDisplayParameterSettingProvider{
    addColumnsSmartDisplayContainSetting : any[] ;
    addColumnsSmartDisplayParameterSetting : any[] ;
    
    public constructor(private storage: SQLite){
        //this.init();
    }  
    
    async init()
    {
         //Database SmartDisplayParameterSetting
         this.createDatabaseSmartDisplayParameterSetting()
         .then(async result => {
            if(result){
                this.addColumnSmartDisplayParameterSetting();
                await this.alterTableSmartDisplayParameterSetting();
                
            }
         })
         .catch(err => {
             console.error(err);
         });
    }

    //SmartDisplayParameterSetting
    createDatabaseSmartDisplayParameterSetting() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS SmartDisplayParameterSetting
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

    addColumnSmartDisplayParameterSetting()
    {
        this.addColumnsSmartDisplayParameterSetting = [];
        this.addColumnsSmartDisplayParameterSetting.push({Column : "Application_Filepath", DataType : "varchar(500)"});
        this.addColumnsSmartDisplayParameterSetting.push({Column : "Customer_Admin_GroupID", DataType : "int"});
        this.addColumnsSmartDisplayParameterSetting.push({Column : "FTP_End_Time", DataType : "varchar(10)"});
        this.addColumnsSmartDisplayParameterSetting.push({Column : "FTP_Interval", DataType : "int"});
        this.addColumnsSmartDisplayParameterSetting.push({Column : "FTP_Start_Time", DataType : "varchar(10)"});
        this.addColumnsSmartDisplayParameterSetting.push({Column : "Multimedia_FilePath", DataType : "varchar(500)"});
        this.addColumnsSmartDisplayParameterSetting.push({Column : "Update_Version_Interval", DataType : "int"});
        //console.log(this.addColumnsSmartDisplayParameterSetting)
    }

    public getSmartDisplayParameterSetting() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM SmartDisplayParameterSetting where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObjectSmartDisplayParameterSetting(data.rows.item(i).Id,
                                                        data.rows.item(i).Application_Filepath,
                                                        data.rows.item(i).Customer_Admin_GroupID, 
                                                        data.rows.item(i).FTP_End_Time,
                                                        data.rows.item(i).FTP_Interval,
                                                        data.rows.item(i).FTP_Start_Time,
                                                        data.rows.item(i).Multimedia_FilePath,
                                                        data.rows.item(i).Update_Version_Interval);
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

    async alterTableSmartDisplayParameterSetting()
    {
        for(let i = 0 ; i < this.addColumnsSmartDisplayParameterSetting.length ; i ++)
        {
            var isColumExist = await this.isColumnExistSmartDisplayParameterSetting(this.addColumnsSmartDisplayParameterSetting[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumnsSmartDisplayParameterSetting[i].Column;
                var dataType = this.addColumnsSmartDisplayParameterSetting[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE SmartDisplayParameterSetting ADD COLUMN "+columName+" "+ dataType, [])
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
    
    async saveSmartDisplayParameterSetting(
        Application_Filepath: string, 
        Customer_Admin_GroupID: number, 
        FTP_End_Time : string,
        FTP_Interval : number,
        FTP_Start_Time : string,
        Multimedia_FilePath : string,
        Update_Version_Interval : number) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO SmartDisplayParameterSetting (Application_Filepath, 
                Customer_Admin_GroupID, 
                FTP_End_Time,
                FTP_Interval,
                FTP_Start_Time,
                Multimedia_FilePath,
                Update_Version_Interval) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)`, [Application_Filepath, 
                                Customer_Admin_GroupID, 
                                FTP_End_Time,
                                FTP_Interval,
                                FTP_Start_Time,
                                Multimedia_FilePath,
                                Update_Version_Interval])
            .then((data) => {
                console.log("param setting SQL Insert Execute");
                //resolve(data);
            })
            .catch((error) =>
            {
                console.error(error);
            });
        });
    }

    async updateSmartDisplayParameterSetting(Column : string, Value : any)
    {
       var isExist = await this.isDataExistSmartDisplayParameterSetting();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE SmartDisplayParameterSetting set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO SmartDisplayParameterSetting ("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        
    }

    isColumnExistSmartDisplayParameterSetting(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from SmartDisplayParameterSetting where 1 = 2", [])
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

    createObjectSmartDisplayParameterSetting(Id : number, 
        Application_Filepath: string, 
        Customer_Admin_GroupID: number, 
        FTP_End_Time : string,
        FTP_Interval : number,
        FTP_Start_Time : string,
        Multimedia_FilePath : string,
        Update_Version_Interval : number
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "Application_Filepath" : Application_Filepath,
            "Customer_Admin_GroupID" : Customer_Admin_GroupID,
            "FTP_End_Time" : FTP_End_Time,
            "FTP_Interval" : FTP_Interval,
            "FTP_Start_Time" : FTP_Start_Time,
            "Multimedia_FilePath" : Multimedia_FilePath,
            "Update_Version_Interval" : Update_Version_Interval
        }

        return object;
    }

    isDataExistSmartDisplayParameterSetting() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
                let isExist = false;
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM SmartDisplayParameterSetting where Id = 1", [])
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
}