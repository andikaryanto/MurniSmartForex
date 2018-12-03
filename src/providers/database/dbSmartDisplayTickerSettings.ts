import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbSmartDisplayTickerSettingsProvider{
    
    addColumnsSmartDisplayTickerSettings : any[] ;
    
    public constructor(private storage: SQLite){
        //this.init();
    } 

    async init(){
         //Database SmartDisplayTickerSettings
         this.createDatabaseSmartDisplayTickerSettings()
         .then(async result => {
            if(result){
                this.addColumnSmartDisplayTickerSettings();
                await this.alterTableSmartDisplayTickerSettings();
            }
         })
         .catch(err => {
             console.error(err);
         });

    }

    //SmartDisplayTickerSettings
    createDatabaseSmartDisplayTickerSettings() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS SmartDisplayTickerSettings
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

    addColumnSmartDisplayTickerSettings()
    {
        this.addColumnsSmartDisplayTickerSettings = [];
        this.addColumnsSmartDisplayTickerSettings.push({Column : "FontName", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "FontSize", DataType : "int"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "FontColour", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "BGColour", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator_ImageFilePath", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator_Line", DataType : "int"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator_LineColour", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator_LineThickness", DataType : "int"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator_SymbolFilePath", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Separator_SymbolColour", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Delay", DataType : "int"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "Step", DataType : "int"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "DelayPotrait", DataType : "int"});
        this.addColumnsSmartDisplayTickerSettings.push({Column : "StepPotrait", DataType : "int"});
        //console.log(this.addColumnsSmartDisplayTickerSettings)
    }

    public getSmartDisplayTickerSettings() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM SmartDisplayTickerSettings where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObjectSmartDisplayTickerSettings(data.rows.item(i).Id,
                                                        data.rows.item(i).FontName,
                                                        data.rows.item(i).FontSize, 
                                                        data.rows.item(i).FontColour,
                                                        data.rows.item(i).BGColour,
                                                        data.rows.item(i).Separator,
                                                        data.rows.item(i).Separator_ImageFilePath,
                                                        data.rows.item(i).Separator_Line,
                                                        data.rows.item(i).Separator_LineColour,
                                                        data.rows.item(i).Separator_LineThickness,
                                                        data.rows.item(i).Separator_SymbolFilePath,
                                                        data.rows.item(i).Separator_SymbolColour,
                                                        data.rows.item(i).Delay,
                                                        data.rows.item(i).Step,
                                                        data.rows.item(i).DelayPotrait,
                                                        data.rows.item(i).StepPotrait);
                        }
                    }
                    //console.log('demoSetting',demoSetting);
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

    async alterTableSmartDisplayTickerSettings()
    {
        for(let i = 0 ; i < this.addColumnsSmartDisplayTickerSettings.length ; i ++)
        {
            var isColumExist = await this.isColumnExistSmartDisplayTickerSettings(this.addColumnsSmartDisplayTickerSettings[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumnsSmartDisplayTickerSettings[i].Column;
                var dataType = this.addColumnsSmartDisplayTickerSettings[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE SmartDisplayTickerSettings ADD COLUMN "+columName+" "+ dataType, [])
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
    
    async saveSmartDisplayTickerSettings(
        Id : number,
        FontName: string, 
        FontSize: number,
        FontColour: string, 
        BGColour: string,  
        Separator: string , 
        Separator_ImageFilePath: string,
        Separator_Line: number, 
        Separator_LineColour: string,  
        Separator_LineThickness : number,
        Separator_SymbolFilePath: string, 
        Separator_SymbolColour: string,
        Delay: number, 
        Step: number,  
        DelayPotrait : number,
        StepPotrait : number) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO SmartDisplayTickerSettings (Id,
                                                FontName,
                                                FontSize,
                                                FontColour,
                                                BGColour,
                                                Separator,
                                                Separator_ImageFilePath,
                                                Separator_Line,
                                                Separator_LineColour,
                                                Separator_LineThickness,
                                                Separator_SymbolFilePath,
                                                Separator_SymbolColour,
                                                Delay,
                                                Step,
                                                DelayPotrait,
                                                StepPotrait) 
                            VALUES (?, ?, ? , ? ,?,?, ?, ? , ? ,?,?, ?, ? , ? ,?,?)`, 
                                               [Id,
                                                FontName,
                                                FontSize,
                                                FontColour,
                                                BGColour,
                                                Separator,
                                                Separator_ImageFilePath,
                                                Separator_Line,
                                                Separator_LineColour,
                                                Separator_LineThickness,
                                                Separator_SymbolFilePath,
                                                Separator_SymbolColour,
                                                Delay,
                                                Step,
                                                DelayPotrait,
                                                StepPotrait])
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


    updateSmartDisplayTickerSettings( Id: number,
        FontName: string, 
        FontSize: number,
        FontColour: string, 
        BGColour: string,  
        Separator: string , 
        Separator_ImageFilePath: string,
        Separator_Line: number, 
        Separator_LineColour: string,  
        Separator_LineThickness : number,
        Separator_SymbolFilePath: string, 
        Separator_SymbolColour: string,
        Delay: number, 
        Step: number,  
        DelayPotrait : number,
        StepPotrait : number){

        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                //if(isExist)
                //    sql = "UPDATE Multimedia set BackupDate = ?, FormatedDate = ?, FileName = ? WHERE Id = 1";
                //else
                    sql = `UPDATE SmartDisplayTickerSettings SET
                                    FontName = ?,
                                    FontSize = ?,
                                    FontColour = ?,
                                    BGColour = ?,
                                    Separator = ?,
                                    Separator_ImageFilePath = ?, 
                                    Separator_Line = ?,
                                    Separator_LineColour = ?,
                                    Separator_LineThickness = ?,
                                    Separator_SymbolFilePath = ?,
                                    Separator_SymbolColour = ?,
                                    Delay = ?,
                                    Step = ?,
                                    DelayPotrait = ?,
                                    StepPotrait = ?
                            WHERE Id = ?`;
    
                db.executeSql(sql, [FontName,
                                    FontSize,
                                    FontColour,
                                    BGColour,
                                    Separator,
                                    Separator_ImageFilePath,
                                    Separator_Line,
                                    Separator_LineColour,
                                    Separator_LineThickness,
                                    Separator_SymbolFilePath,
                                    Separator_SymbolColour,
                                    Delay,
                                    Step,
                                    DelayPotrait,
                                    StepPotrait,
                                    Id])
                .then((data) => {
                    console.log("Ticker Setting updated SQL Insert Execute");
                    resolve(true);
                    //resolve(data);
                })
                .catch((error) =>
                {
                    console.error(error);
                    resolve(false);
                });
            });
        });
    }

    isColumnExistSmartDisplayTickerSettings(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from SmartDisplayTickerSettings where 1 = 2", [])
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

    createObjectSmartDisplayTickerSettings(Id : number, 
        FontName: string, 
        FontSize: number,
        FontColour: string, 
        BGColour: string,  
        Separator: string , 
        Separator_ImageFilePath: string,
        Separator_Line: number, 
        Separator_LineColour: string,  
        Separator_LineThickness : number,
        Separator_SymbolFilePath: string, 
        Separator_SymbolColour: string,
        Delay: number, 
        Step: number,  
        DelayPotrait : number,
        StepPotrait : number
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "FontName" : FontName,
            "FontSize" : FontSize,
            "FontColour" : FontColour,
            "BGColour" : BGColour,
            "Separator" : Separator,
            "Separator_ImageFilePath" : Separator_ImageFilePath,
            "Separator_Line" : Separator_Line,
            "Separator_LineColour" : Separator_LineColour,
            "Separator_LineThickness" : Separator_LineThickness,
            "Separator_SymbolFilePath" : Separator_SymbolFilePath,
            "Separator_SymbolColour" : Separator_SymbolColour,
            "Delay" : Delay,
            "Step" : Step,
            "DelayPotrait" : DelayPotrait,
            "StepPotrait" : StepPotrait
        }

        return object;
    }

    isDataExistSmartDisplayTickerSettings() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
                let isExist = false;
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM SmartDisplayTickerSettings where Id = 1", [])
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