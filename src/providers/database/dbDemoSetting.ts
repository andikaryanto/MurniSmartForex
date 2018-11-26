import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Col } from 'ionic-angular';

@Injectable()
export class DbDemoSettingProvider
{
    
    private isOpen: boolean;
    addColumns : any[] ;
    
    public constructor(private storage: SQLite){
        //this.init();
    }  
    
    async init()
    {
        //Test
        this.createDatabase()
        .then(async isTableCreated => {
            if(isTableCreated)
            {
                this.addColumn();
                await this.alterTable();
            }
        })
        .catch(err => console.log(err));
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
                // db.executeSql(`CREATE TABLE IF NOT EXISTS DemoSetting
                //                             ( 
                //                                 Id INTEGER Primary Key AUTOINCREMENT,
                //                                 ScreenOrientation int, 
                //                                 UseTicker int, 
                //                                 ImageFolder varchar(100), 
                //                                 VideoFolder varchar(100)
                //                             )`, [])
                //db.open();
                db.executeSql(`CREATE TABLE IF NOT EXISTS DemoSetting
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
        this.addColumns.push({Column : "ScreenOrientation", DataType : "int"},
                            {Column : "UseTicker", DataType : "int"},
                            {Column : "ImageFolder", DataType : "varchar(100)"},
                            {Column : "VideoFolder", DataType : "varchar(100)"},
                            {Column : "MultimediaPriority", DataType : "int"},
                            {Column : "TabularTemplate", DataType : "int"},
                            {Column : "TabularMaxColumn", DataType : "int"},
                            {Column : "TabularMaxFixedRow", DataType : "int"},
                            {Column : "TabularMaxDynamicRow", DataType : "int"},
                            {Column : "TabularMulmedType", DataType : "int"},
                            {Column : "TabularFooterText", DataType : "text"})
        //console.log(this.addColumns)
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
                    db.executeSql("ALTER TABLE DemoSetting ADD COLUMN "+columName+" "+ dataType, [])
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

    public getDemoSetting() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM DemoSetting where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).ScreenOrientation, 
                                                        data.rows.item(i).UseTicker,
                                                        data.rows.item(i).ImageFolder,
                                                        data.rows.item(i).VideoFolder,
                                                        data.rows.item(i).MultimediaPriority,
                                                        data.rows.item(i).TabularTemplate,
                                                        data.rows.item(i).TabularMaxColumn,
                                                        data.rows.item(i).TabularMaxFixedRow,
                                                        data.rows.item(i).TabularMulmedType,
                                                        data.rows.item(i).TabularFooterText,
                                                        data.rows.item(i).TabularMaxDynamicRow)
                            
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


    public saveDemoSetting(
        ScreenOrientation: number, 
        UseTicker: number, 
        ImageFolder : string , 
        VideoFolder : string,
        MultimediaPriority : number,
        TabularTemplate : number, 
        TabularMaxColumn : number,
        TabularMaxFixedRow : number,
        TabularMulmedType : number,
        TabularFooterText : string,
        TabularMaxDynamicRow: number) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO DemoSetting (ScreenOrientation, 
                                                    UseTicker, 
                                                    ImageFolder, 
                                                    VideoFolder,
                                                    MultimediaPriority,
                                                    TabularTemplate,
                                                    TabularMaxColumn,
                                                    TabularMaxFixedRow,
                                                    TabularMulmedType,
                                                    TabularFooterText,
                                                    TabularMaxDynamicRow) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ScreenOrientation, 
                                                    UseTicker, 
                                                    ImageFolder, 
                                                    VideoFolder,
                                                    MultimediaPriority,
                                                    TabularTemplate,
                                                    TabularMaxColumn,
                                                    TabularMaxFixedRow,
                                                    TabularMulmedType,
                                                    TabularFooterText,
                                                    TabularMaxDynamicRow])
            .then((data) => {
                console.log("SQL Insert Execute");
                //resolve(data);
            }, (error) => {
                //reject(error);
            });
        });
    }

    updateDemoSetting(ScreenOrientation?: number, UseTicker?: number, ImageFolder? : string , VideoFolder? : string)
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`UPDATE DemoSetting set ScreenOrientation = ?, 
                                                UseTicker = ?, 
                                                ImageFolder = ?, 
                                                VideoFolder = ? 
                            WHERE Id = 1`, [ScreenOrientation, UseTicker, ImageFolder, VideoFolder])
            .then((data) => {
                console.log("SQL Insert Updated");
                //resolve(data);
            }, (error) => {
                //reject(error);
            });
        });
    }

    async updateDemoSettingColumn(Column : string, Value : any)
    {
       var isExist = await this.isDataExist();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE DemoSetting set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO DemoSetting("+Column+") Values(?)";
                    
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
                ScreenOrientation: number, 
                UseTicker: number, 
                ImageFolder : string , 
                VideoFolder : string,
                MultimediaPriority : number,
                TabularTemplate : number,
                TabularMaxColumn : number,
                TabularMaxFixedRow : number,
                TabularMulmedType : number,
                TabularFooterText : string,
                TabularMaxDynamicRow : number
            ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "ScreenOrientation" : ScreenOrientation,
            "UseTicker" : UseTicker,
            "ImageFolder" : ImageFolder,
            "VideoFolder" : VideoFolder,
            "MultimediaPriority" : MultimediaPriority,
            "TabularTemplate" : TabularTemplate,
            "TabularMaxColumn": TabularMaxColumn,
            "TabularMaxFixedRow" : TabularMaxFixedRow,
            "TabularMulmedType": TabularMulmedType,
            "TabularFooterText" : TabularFooterText,
            "TabularMaxDynamicRow" : TabularMaxDynamicRow
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
                    db.executeSql("SELECT * FROM DemoSetting where Id = 1", [])
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
                db.executeSql("SELECT "+columnName+" from DemoSetting where 1 = 2", [])
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