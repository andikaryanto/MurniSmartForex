import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbBackUpStatusProvider
{
    addColumns : any[] ;
    public constructor(private storage: SQLite){
        //this.init();
    }  

    async init()
    {
        var isTableCreated = await this.createDatabase();
        if(isTableCreated)
        {
            this.addColumn();
            await this.alterTable();
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
                db.executeSql(`CREATE TABLE IF NOT EXISTS BackupStatus
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
        this.addColumns.push({Column : "BackupDate", DataType : "text"});
        this.addColumns.push({Column : "FormatedDate", DataType : "text"});
        this.addColumns.push({Column : "FileName", DataType : "text"});
        //console.log(this.addColumns);
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
                    db.executeSql("ALTER TABLE BackupStatus ADD COLUMN "+columName+" "+ dataType, [])
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

    isColumnExist(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from BackupStatus where 1 = 2", [])
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

    async saveBackUpStatus(
        BackupDate: string, 
        FormatedDate: string, 
        FileName: string) 
    {
       var isExist = await this.isDataExist();
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            var sql = "";
            if(isExist)
                sql = "UPDATE BackupStatus set BackupDate = ?, FormatedDate = ?, FileName = ? WHERE Id = 1";
            else
                sql = `INSERT INTO BackupStatus (BackupDate,FormatedDate, FileName) 
                        VALUES (?, ?, ?)`;

            db.executeSql(sql, [BackupDate, 
                                FormatedDate,
                                FileName])
            .then((data) => {
                console.log("Back Status SQL Insert Execute");
                //resolve(data);
            })
            .catch((error) =>
            {
                console.error(error);
            });
        });
    }

    async updateBackupStatusColumn(Column : string, Value : any)
    {
       var isExist = await this.isDataExist();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE BackupStatus set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO BackupStatus("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        
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
                db.executeSql("SELECT * FROM BackupStatus where Id = 1", [])
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

    createObject(Id : number, 
        BackupDate: string, 
        FormatedDate :string,
        FileName: string
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "BackupDate" : BackupDate,
            "FormatedDate" : FormatedDate,
            "FileName" : FileName
        }

        return object;
    }

    public getBackUpStatus() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let backupStatus = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM BackupStatus where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            backupStatus = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).BackupDate, 
                                                        data.rows.item(i).FormatedDate,
                                                        data.rows.item(i).FileName)
                            
                        }
                    }
                    //console.log(user);
                    resolve(backupStatus);
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