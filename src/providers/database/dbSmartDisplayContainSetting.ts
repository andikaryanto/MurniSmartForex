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
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Logo_Percent_Top_P", DataType : "int"});

        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Banner_Date_Time_Percent_Top_P", DataType : "int"});

        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Forex_Percent_Top_P", DataType : "int"});

        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Board_Percent_Top_P", DataType : "int"});

        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Multimedia_Percent_Top_P", DataType : "int"});

        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "Running_Text_Percent_Top_P", DataType : "int"});

        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_IsShow", DataType : "varchar(1)"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Height_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Width_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Left_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Top_L", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Height_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Width_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Left_P", DataType : "int"});
        this.addColumnsSmartDisplayContainSetting.push({Column : "RSSFeed_Percent_Top_P", DataType : "int"});

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
                            demoSetting = this.createObjectSmartDisplayContainSetting(
                                data.rows.item(i).Id,

                                data.rows.item(i).Logo_IsShow,
                                data.rows.item(i).Logo_Percent_Height_L,
                                data.rows.item(i).Logo_Percent_Width_L,
                                data.rows.item(i).Logo_Percent_Left_L,
                                data.rows.item(i).Logo_Percent_Top_L,
                                data.rows.item(i).Logo_Percent_Height_P,
                                data.rows.item(i).Logo_Percent_Width_P,
                                data.rows.item(i).Logo_Percent_Left_P,
                                data.rows.item(i).Logo_Percent_Top_P,
                                
                                data.rows.item(i).Banner_Date_Time_IsShow,
                                data.rows.item(i).Banner_Date_Time_Percent_Height_L,
                                data.rows.item(i).Banner_Date_Time_Percent_Width_L,
                                data.rows.item(i).Banner_Date_Time_Percent_Left_L,
                                data.rows.item(i).Banner_Date_Time_Percent_Top_L,
                                data.rows.item(i).Banner_Date_Time_Percent_Height_P,
                                data.rows.item(i).Banner_Date_Time_Percent_Width_P,
                                data.rows.item(i).Banner_Date_Time_Percent_Left_P,
                                data.rows.item(i).Banner_Date_Time_Percent_Top_P,
                                
                                data.rows.item(i).Forex_IsShow,
                                data.rows.item(i).Forex_Percent_Height_L, 
                                data.rows.item(i).Forex_Percent_Width_L,
                                data.rows.item(i).Forex_Percent_Left_L,
                                data.rows.item(i).Forex_Percent_Top_L,
                                data.rows.item(i).Forex_Percent_Height_P,
                                data.rows.item(i).Forex_Percent_Width_P,
                                data.rows.item(i).Forex_Percent_Left_P,
                                data.rows.item(i).Forex_Percent_Top_P,
                                
                                data.rows.item(i).Board_IsShow,
                                data.rows.item(i).Board_Percent_Height_L, 
                                data.rows.item(i).Board_Percent_Width_L,
                                data.rows.item(i).Board_Percent_Left_L,
                                data.rows.item(i).Board_Percent_Top_L,
                                data.rows.item(i).Board_Percent_Height_P,
                                data.rows.item(i).Board_Percent_Width_P,
                                data.rows.item(i).Board_Percent_Left_P,
                                data.rows.item(i).Board_Percent_Top_P,
                                
                                data.rows.item(i).Multimedia_IsShow,
                                data.rows.item(i).Multimedia_Percent_Height_L, 
                                data.rows.item(i).Multimedia_Percent_Width_L,
                                data.rows.item(i).Multimedia_Percent_Left_L,
                                data.rows.item(i).Multimedia_Percent_Top_L,
                                data.rows.item(i).Multimedia_Percent_Height_P,
                                data.rows.item(i).Multimedia_Percent_Width_P,
                                data.rows.item(i).Multimedia_Percent_Left_P,
                                data.rows.item(i).Multimedia_Percent_Top_P,
                                
                                data.rows.item(i).Running_Text_IsShow,
                                data.rows.item(i).Running_Text_Percent_Height_L, 
                                data.rows.item(i).Running_Text_Percent_Width_L,
                                data.rows.item(i).Running_Text_Percent_Left_L,
                                data.rows.item(i).Running_Text_Percent_Top_L,
                                data.rows.item(i).Running_Text_Percent_Height_P,
                                data.rows.item(i).Running_Text_Percent_Width_P,
                                data.rows.item(i).Running_Text_Percent_Left_P,
                                data.rows.item(i).Running_Text_Percent_Top_P,

                                data.rows.item(i).RSSFeed_IsShow,
                                data.rows.item(i).RSSFeed_Percent_Height_L, 
                                data.rows.item(i).RSSFeed_Percent_Width_L,
                                data.rows.item(i).RSSFeed_Percent_Left_L,
                                data.rows.item(i).RSSFeed_Percent_Top_L,
                                data.rows.item(i).RSSFeed_Percent_Height_P,
                                data.rows.item(i).RSSFeed_Percent_Width_P,
                                data.rows.item(i).RSSFeed_Percent_Left_P,
                                data.rows.item(i).RSSFeed_Percent_Top_P);
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
        Logo_Percent_Height_L : number,
        Logo_Percent_Width_L : number,
        Logo_Percent_Left_L : number,
        Logo_Percent_Top_L : number,
        Logo_Percent_Height_P : number,
        Logo_Percent_Width_P : number,
        Logo_Percent_Left_P  : number,
        Logo_Percent_Top_P : number,
    
        Banner_Date_Time_IsShow: string, 
        Banner_Date_Time_Percent_Height_L : number,
        Banner_Date_Time_Percent_Width_L : number,
        Banner_Date_Time_Percent_Left_L : number,
        Banner_Date_Time_Percent_Top_L : number,
        Banner_Date_Time_Percent_Height_P : number,
        Banner_Date_Time_Percent_Width_P : number,
        Banner_Date_Time_Percent_Left_P  : number,
        Banner_Date_Time_Percent_Top_P : number,

        Forex_IsShow : string,
        Forex_Percent_Height_L: number, 
        Forex_Percent_Width_L : number,
        Forex_Percent_Left_L : number,
        Forex_Percent_Top_L : number,
        Forex_Percent_Height_P : number,
        Forex_Percent_Width_P : number,
        Forex_Percent_Left_P : number,
        Forex_Percent_Top_P  : number,

        Board_IsShow : string,
        Board_Percent_Height_L: number, 
        Board_Percent_Width_L : number,
        Board_Percent_Left_L : number,
        Board_Percent_Top_L : number,
        Board_Percent_Height_P : number,
        Board_Percent_Width_P : number,
        Board_Percent_Left_P : number,
        Board_Percent_Top_P  : number,

        Multimedia_IsShow : string,
        Multimedia_Percent_Height_L: number, 
        Multimedia_Percent_Width_L : number,
        Multimedia_Percent_Left_L : number,
        Multimedia_Percent_Top_L : number,
        Multimedia_Percent_Height_P : number,
        Multimedia_Percent_Width_P : number,
        Multimedia_Percent_Left_P : number,
        Multimedia_Percent_Top_P  : number,

        Running_Text_IsShow : string,
        Running_Text_Percent_Height_L: number, 
        Running_Text_Percent_Width_L : number,
        Running_Text_Percent_Left_L : number,
        Running_Text_Percent_Top_L : number,
        Running_Text_Percent_Height_P : number,
        Running_Text_Percent_Width_P : number,
        Running_Text_Percent_Left_P : number,
        Running_Text_Percent_Top_P  : number,

        RSSFeed_IsShow : string,
        RSSFeed_Percent_Height_L: number, 
        RSSFeed_Percent_Width_L : number,
        RSSFeed_Percent_Left_L : number,
        RSSFeed_Percent_Top_L : number,
        RSSFeed_Percent_Height_P : number,
        RSSFeed_Percent_Width_P : number,
        RSSFeed_Percent_Left_P : number,
        RSSFeed_Percent_Top_P  : number) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO SmartDisplayContainSetting (Logo_IsShow,
                                                    Logo_Percent_Height_L,
                                                    Logo_Percent_Width_L,
                                                    Logo_Percent_Left_L,
                                                    Logo_Percent_Top_L,
                                                    Logo_Percent_Height_P,
                                                    Logo_Percent_Width_P,
                                                    Logo_Percent_Left_P,
                                                    Logo_Percent_Top_P,

                                                    Banner_Date_Time_IsShow,
                                                    Banner_Date_Time_Percent_Height_L,
                                                    Banner_Date_Time_Percent_Width_L,
                                                    Banner_Date_Time_Percent_Left_L,
                                                    Banner_Date_Time_Percent_Top_L,
                                                    Banner_Date_Time_Percent_Height_P,
                                                    Banner_Date_Time_Percent_Width_P,
                                                    Banner_Date_Time_Percent_Left_P,
                                                    Banner_Date_Time_Percent_Top_P,

                                                    Forex_IsShow,
                                                    Forex_Percent_Height_L, 
                                                    Forex_Percent_Width_L,
                                                    Forex_Percent_Left_L,
                                                    Forex_Percent_Top_L,
                                                    Forex_Percent_Height_P,
                                                    Forex_Percent_Width_P,
                                                    Forex_Percent_Left_P,
                                                    Forex_Percent_Top_P,

                                                    Board_IsShow,
                                                    Board_Percent_Height_L, 
                                                    Board_Percent_Width_L,
                                                    Board_Percent_Left_L,
                                                    Board_Percent_Top_L,
                                                    Board_Percent_Height_P,
                                                    Board_Percent_Width_P,
                                                    Board_Percent_Left_P,
                                                    Board_Percent_Top_P,

                                                    Multimedia_IsShow,
                                                    Multimedia_Percent_Height_L, 
                                                    Multimedia_Percent_Width_L,
                                                    Multimedia_Percent_Left_L,
                                                    Multimedia_Percent_Top_L,
                                                    Multimedia_Percent_Height_P,
                                                    Multimedia_Percent_Width_P,
                                                    Multimedia_Percent_Left_P,
                                                    Multimedia_Percent_Top_P,

                                                    Running_Text_IsShow,
                                                    Running_Text_Percent_Height_L, 
                                                    Running_Text_Percent_Width_L,
                                                    Running_Text_Percent_Left_L,
                                                    Running_Text_Percent_Top_L,
                                                    Running_Text_Percent_Height_P,
                                                    Running_Text_Percent_Width_P,
                                                    Running_Text_Percent_Left_P,
                                                    Running_Text_Percent_Top_P,
                                                    
                                                    RSSFeed_IsShow,
                                                    RSSFeed_Percent_Height_L, 
                                                    RSSFeed_Percent_Width_L,
                                                    RSSFeed_Percent_Left_L,
                                                    RSSFeed_Percent_Top_L,
                                                    RSSFeed_Percent_Height_P,
                                                    RSSFeed_Percent_Width_P,
                                                    RSSFeed_Percent_Left_P,
                                                    RSSFeed_Percent_Top_P) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [Logo_IsShow,
                                Logo_Percent_Height_L,
                                Logo_Percent_Width_L,
                                Logo_Percent_Left_L,
                                Logo_Percent_Top_L,
                                Logo_Percent_Height_P,
                                Logo_Percent_Width_P,
                                Logo_Percent_Left_P,
                                Logo_Percent_Top_P,

                                Banner_Date_Time_IsShow,
                                Banner_Date_Time_Percent_Height_L,
                                Banner_Date_Time_Percent_Width_L,
                                Banner_Date_Time_Percent_Left_L,
                                Banner_Date_Time_Percent_Top_L,
                                Banner_Date_Time_Percent_Height_P,
                                Banner_Date_Time_Percent_Width_P,
                                Banner_Date_Time_Percent_Left_P,
                                Banner_Date_Time_Percent_Top_P,

                                Forex_IsShow,
                                Forex_Percent_Height_L, 
                                Forex_Percent_Width_L,
                                Forex_Percent_Left_L,
                                Forex_Percent_Top_L,
                                Forex_Percent_Height_P,
                                Forex_Percent_Width_P,
                                Forex_Percent_Left_P,
                                Forex_Percent_Top_P,

                                Board_IsShow,
                                Board_Percent_Height_L, 
                                Board_Percent_Width_L,
                                Board_Percent_Left_L,
                                Board_Percent_Top_L,
                                Board_Percent_Height_P,
                                Board_Percent_Width_P,
                                Board_Percent_Left_P,
                                Board_Percent_Top_P,

                                Multimedia_IsShow,
                                Multimedia_Percent_Height_L, 
                                Multimedia_Percent_Width_L,
                                Multimedia_Percent_Left_L,
                                Multimedia_Percent_Top_L,
                                Multimedia_Percent_Height_P,
                                Multimedia_Percent_Width_P,
                                Multimedia_Percent_Left_P,
                                Multimedia_Percent_Top_P,

                                Running_Text_IsShow,
                                Running_Text_Percent_Height_L, 
                                Running_Text_Percent_Width_L,
                                Running_Text_Percent_Left_L,
                                Running_Text_Percent_Top_L,
                                Running_Text_Percent_Height_P,
                                Running_Text_Percent_Width_P,
                                Running_Text_Percent_Left_P,
                                Running_Text_Percent_Top_P,

                                RSSFeed_IsShow,
                                RSSFeed_Percent_Height_L, 
                                RSSFeed_Percent_Width_L,
                                RSSFeed_Percent_Left_L,
                                RSSFeed_Percent_Top_L,
                                RSSFeed_Percent_Height_P,
                                RSSFeed_Percent_Width_P,
                                RSSFeed_Percent_Left_P,
                                RSSFeed_Percent_Top_P])
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
        Logo_Percent_Height_L : number,
        Logo_Percent_Width_L : number,
        Logo_Percent_Left_L : number,
        Logo_Percent_Top_L : number,
        Logo_Percent_Height_P : number,
        Logo_Percent_Width_P : number,
        Logo_Percent_Left_P  : number,
        Logo_Percent_Top_P : number,
    
        Banner_Date_Time_IsShow: string, 
        Banner_Date_Time_Percent_Height_L : number,
        Banner_Date_Time_Percent_Width_L : number,
        Banner_Date_Time_Percent_Left_L : number,
        Banner_Date_Time_Percent_Top_L : number,
        Banner_Date_Time_Percent_Height_P : number,
        Banner_Date_Time_Percent_Width_P : number,
        Banner_Date_Time_Percent_Left_P  : number,
        Banner_Date_Time_Percent_Top_P : number,

        Forex_IsShow : string,
        Forex_Percent_Height_L: number, 
        Forex_Percent_Width_L : number,
        Forex_Percent_Left_L : number,
        Forex_Percent_Top_L : number,
        Forex_Percent_Height_P : number,
        Forex_Percent_Width_P : number,
        Forex_Percent_Left_P : number,
        Forex_Percent_Top_P  : number,

        Board_IsShow : string,
        Board_Percent_Height_L: number, 
        Board_Percent_Width_L : number,
        Board_Percent_Left_L : number,
        Board_Percent_Top_L : number,
        Board_Percent_Height_P : number,
        Board_Percent_Width_P : number,
        Board_Percent_Left_P : number,
        Board_Percent_Top_P  : number,

        Multimedia_IsShow : string,
        Multimedia_Percent_Height_L: number, 
        Multimedia_Percent_Width_L : number,
        Multimedia_Percent_Left_L : number,
        Multimedia_Percent_Top_L : number,
        Multimedia_Percent_Height_P : number,
        Multimedia_Percent_Width_P : number,
        Multimedia_Percent_Left_P : number,
        Multimedia_Percent_Top_P  : number,

        Running_Text_IsShow : string,
        Running_Text_Percent_Height_L: number, 
        Running_Text_Percent_Width_L : number,
        Running_Text_Percent_Left_L : number,
        Running_Text_Percent_Top_L : number,
        Running_Text_Percent_Height_P: number,
        Running_Text_Percent_Width_P : number,
        Running_Text_Percent_Left_P : number,
        Running_Text_Percent_Top_P : number,

        RSSFeed_IsShow : string,
        RSSFeed_Percent_Height_L: number, 
        RSSFeed_Percent_Width_L : number,
        RSSFeed_Percent_Left_L : number,
        RSSFeed_Percent_Top_L : number,
        RSSFeed_Percent_Height_P : number,
        RSSFeed_Percent_Width_P : number,
        RSSFeed_Percent_Left_P : number,
        RSSFeed_Percent_Top_P  : number
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "Logo_IsShow" : Logo_IsShow,
            "Logo_Percent_Height_L" : Logo_Percent_Height_L,
            "Logo_Percent_Width_L" : Logo_Percent_Width_L,
            "Logo_Percent_Left_L" : Logo_Percent_Left_L,
            "Logo_Percent_Top_L" : Logo_Percent_Top_L,
            "Logo_Percent_Height_P" : Logo_Percent_Height_P,
            "Logo_Percent_Width_P" : Logo_Percent_Width_P,
            "Logo_Percent_Left_P" : Logo_Percent_Left_P ,
            "Logo_Percent_Top_P" : Logo_Percent_Top_P,
            "Banner_Date_Time_IsShow" : Banner_Date_Time_IsShow,
            "Banner_Date_Time_Percent_Height_L"  : Banner_Date_Time_Percent_Height_L,
            "Banner_Date_Time_Percent_Width_L" : Banner_Date_Time_Percent_Width_L,
            "Banner_Date_Time_Percent_Left_L" : Banner_Date_Time_Percent_Left_L,
            "Banner_Date_Time_Percent_Top_L" : Banner_Date_Time_Percent_Top_L,
            "Banner_Date_Time_Percent_Height_P" : Banner_Date_Time_Percent_Height_P,
            "Banner_Date_Time_Percent_Width_P" : Banner_Date_Time_Percent_Width_P,
            "Banner_Date_Time_Percent_Left_P" : Banner_Date_Time_Percent_Left_P ,
            "Banner_Date_Time_Percent_Top_P" : Banner_Date_Time_Percent_Top_P,
            "Forex_IsShow" : Forex_IsShow,
            "Forex_Percent_Height_L" : Forex_Percent_Height_L, 
            "Forex_Percent_Width_L" : Forex_Percent_Width_L,
            "Forex_Percent_Left_L" : Forex_Percent_Left_L,
            "Forex_Percent_Top_L" : Forex_Percent_Top_L,
            "Forex_Percent_Height_P" : Forex_Percent_Height_P,
            "Forex_Percent_Width_P" : Forex_Percent_Width_P,
            "Forex_Percent_Left_P" : Forex_Percent_Left_P,
            "Forex_Percent_Top_P" : Forex_Percent_Top_P,
            "Board_IsShow" : Board_IsShow,
            "Board_Percent_Height_L" : Board_Percent_Height_L, 
            "Board_Percent_Width_L" : Board_Percent_Width_L,
            "Board_Percent_Left_L" : Board_Percent_Left_L,
            "Board_Percent_Top_L" : Board_Percent_Top_L,
            "Board_Percent_Height_P" : Board_Percent_Height_P,
            "Board_Percent_Width_P" : Board_Percent_Width_P,
            "Board_Percent_Left_P" : Board_Percent_Left_P,
            "Board_Percent_Top_P" : Board_Percent_Top_P ,
            "Multimedia_IsShow" : Multimedia_IsShow,
            "Multimedia_Percent_Height_L" : Multimedia_Percent_Height_L, 
            "Multimedia_Percent_Width_L" : Multimedia_Percent_Width_L,
            "Multimedia_Percent_Left_L" : Multimedia_Percent_Left_L,
            "Multimedia_Percent_Top_L" : Multimedia_Percent_Top_L,
            "Multimedia_Percent_Height_P" : Multimedia_Percent_Height_P,
            "Multimedia_Percent_Width_P" : Multimedia_Percent_Width_P,
            "Multimedia_Percent_Left_P" : Multimedia_Percent_Left_P,
            "Multimedia_Percent_Top_P" : Multimedia_Percent_Top_P ,
            "Running_Text_IsShow" : Running_Text_IsShow,
            "Running_Text_Percent_Height_L" : Running_Text_Percent_Height_L, 
            "Running_Text_Percent_Width_L" : Running_Text_Percent_Width_L,
            "Running_Text_Percent_Left_L" : Running_Text_Percent_Left_L,
            "Running_Text_Percent_Top_L" : Running_Text_Percent_Top_L,
            "Running_Text_Percent_Height_P" : Running_Text_Percent_Height_P,
            "Running_Text_Percent_Width_P" : Running_Text_Percent_Width_P,
            "Running_Text_Percent_Left_P" : Running_Text_Percent_Left_P,
            "Running_Text_Percent_Top_P" : Running_Text_Percent_Top_P ,
            "RSSFeed_IsShow" : RSSFeed_IsShow,
            "RSSFeed_Percent_Height_L" : RSSFeed_Percent_Height_L, 
            "RSSFeed_Percent_Width_L" : RSSFeed_Percent_Width_L,
            "RSSFeed_Percent_Left_L" : RSSFeed_Percent_Left_L,
            "RSSFeed_Percent_Top_L" : RSSFeed_Percent_Top_L,
            "RSSFeed_Percent_Height_P" : RSSFeed_Percent_Height_P,
            "RSSFeed_Percent_Width_P" : RSSFeed_Percent_Width_P,
            "RSSFeed_Percent_Left_P" : RSSFeed_Percent_Left_P,
            "RSSFeed_Percent_Top_P" : RSSFeed_Percent_Top_P
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