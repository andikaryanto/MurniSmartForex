import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbSmartDisplayContainSettingProvider{
    addColumnsSmartDisplayContainSetting : any[] ;
    public constructor(private storage: SQLite){
        //this.init();
    }  

    async init(){
        
         //Database SmartDisplayContainSetting
         this.createDatabaseSmartDisplayContainSetting()
         .then(async result => {
            if(result){
                this.addColumnSmartDisplayContainSetting();
                await this.alterTableSmartDisplayContainSetting();
                
            }
         })
         .catch(err => {
             console.error(err);
         });

    }

    //SmartDisplayContainSetting
    createDatabaseSmartDisplayContainSetting() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS SmartDisplayContainSetting
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

    addColumnSmartDisplayContainSetting()
    {
        this.addColumnsSmartDisplayContainSetting = [];
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_IsShow", DataType : "varchar(1)"});
        //console.log(this.addColumnsSmartDisplayContainSetting)
    }

    public getSmartDisplayContainSetting() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM SmartDisplayContainSetting where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObjectSmartDisplayContainSetting(data.rows.item(i).Id,
                                                        data.rows.item(i).Logo_IsShow,
                                                        data.rows.item(i).Banner_Date_Time_IsShow, 
                                                        data.rows.item(i).Forex_IsShow,
                                                        data.rows.item(i).Board_IsShow,
                                                        data.rows.item(i).Multimedia_IsShow,
                                                        data.rows.item(i).Running_Text_IsShow);
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

    async alterTableSmartDisplayContainSetting()
    {
        for(let i = 0 ; i < this.addColumnsSmartDisplayContainSetting.length ; i ++)
        {
            var isColumExist = await this.isColumnExistSmartDisplayContainSetting(this.addColumnsSmartDisplayContainSetting[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumnsSmartDisplayContainSetting[i].Column;
                var dataType = this.addColumnsSmartDisplayContainSetting[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE SmartDisplayContainSetting ADD COLUMN "+columName+" "+ dataType, [])
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
    
    async saveSmartDisplayContainSetting(
        Logo_IsShow: string, 
        Banner_Date_Time_IsShow: string, 
        Forex_IsShow : string,
        Board_IsShow : string,
        Multimedia_IsShow : string,
        Running_Text_IsShow : string) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO SmartDisplayContainSetting (Logo_IsShow,
                                                    Banner_Date_Time_IsShow,
                                                    Forex_IsShow,
                                                    Board_IsShow,
                                                    Multimedia_IsShow,
                                                    Running_Text_IsShow) 
                            VALUES (?, ?, ?, ?, ?, ?)`, [Logo_IsShow, 
                                Banner_Date_Time_IsShow, 
                                Forex_IsShow,
                                Board_IsShow,
                                Multimedia_IsShow,
                                Running_Text_IsShow])
            .then((data) => {
                console.log("Contain Setting SQL Insert Execute");
                //resolve(data);
            })
            .catch((error) =>
            {
                console.error(error);
            });
        });
    }

    async updateSmartDisplayContainSetting(Column : string, Value : any)
    {
       var isExist = await this.isDataExistSmartDisplayContainSetting();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE SmartDisplayContainSetting set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO SmartDisplayContainSetting ("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        
    }

    isColumnExistSmartDisplayContainSetting(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from SmartDisplayContainSetting where 1 = 2", [])
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

    createObjectSmartDisplayContainSetting(Id : number, 
        Logo_IsShow: string, 
        Banner_Date_Time_IsShow: string, 
        Forex_IsShow : string,
        Board_IsShow : string,
        Multimedia_IsShow : string,
        Running_Text_IsShow : string
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "Logo_IsShow" : Logo_IsShow,
            "Banner_Date_Time_IsShow" : Banner_Date_Time_IsShow,
            "Forex_IsShow" : Forex_IsShow,
            "Board_IsShow" : Board_IsShow,
            "Multimedia_IsShow" : Multimedia_IsShow,
            "Running_Text_IsShow" : Running_Text_IsShow
        }

        return object;
    }

    isDataExistSmartDisplayContainSetting() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
                let isExist = false;
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM SmartDisplayContainSetting where Id = 1", [])
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