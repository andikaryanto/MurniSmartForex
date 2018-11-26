import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbRestoreStatusProvider
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
                name: 'dataRestore.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS RestoreStatus
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
        this.addColumns.push({Column : "RestoreDate", DataType : "text"})
        this.addColumns.push({Column : "FileName", DataType : "text"})
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
                   name: 'dataRestore.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE RestoreStatus ADD COLUMN "+columName+" "+ dataType, [])
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
                name: 'dataRestore.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from RestoreStatus where 1 = 2", [])
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

    async saveRestoreStatus(
        RestoreDate: string, 
        FileName: string) 
    {
       var isExist = await this.isDataExist();
        this.storage.create({
            name: 'dataRestore.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            var sql = "";
            if(isExist)
                sql = "UPDATE RestoreStatus set RestoreDate = ? , FileName = ? WHERE Id = 1";
            else
                sql = `INSERT INTO RestoreStatus (RestoreDate, FileName) 
                        VALUES (?, ?)`;

            db.executeSql(sql, [RestoreDate, 
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

    async updateRestoreStatusColumn(Column : string, Value : any)
    {
       var isExist = await this.isDataExist();
            this.storage.create({
                name: 'dataRestore.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE RestoreStatus set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO RestoreStatus("+Column+") Values(?)";
                    
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
                name: 'dataRestore.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM RestoreStatus where Id = 1", [])
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
        RestoreDate: string, 
        FileName: string
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "RestoreDate" : RestoreDate,
            "FileName" : FileName
        }

        return object;
    }

    public getRestoreStatus() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let backupStatus = {};
            this.storage.create({
                name: 'dataRestore.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM RestoreStatus where Id = ?", [1])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            backupStatus = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).RestoreDate, 
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