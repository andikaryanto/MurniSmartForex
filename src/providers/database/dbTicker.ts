import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbTickerProvider
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
                db.executeSql(`CREATE TABLE IF NOT EXISTS Ticker
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
        this.addColumns.push({Column : "TickerId", DataType : "varchar(10)"});
        this.addColumns.push({Column : "Name", DataType : "varchar(255)"});
        this.addColumns.push({Column : "Texts", DataType : "text"});
        this.addColumns.push({Column : "Priority", DataType : "int"});
        this.addColumns.push({Column : "Active", DataType : "int"});
        this.addColumns.push({Column : "ActivationDate", DataType : "text"});
        this.addColumns.push({Column : "DeactivationDate", DataType : "text"});
        this.addColumns.push({Column : "IsDelete", DataType : "int"});
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
                    db.executeSql("ALTER TABLE Ticker ADD COLUMN "+columName+" "+ dataType, [])
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
                db.executeSql("SELECT "+columnName+" from Ticker where 1 = 2", [])
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

    updateTicker( Id: number,
        TickerId: number, 
        Name: string,
        Texts : string,
        Priority : number,
        Active : number,
        ActivationDate : string,
        DeactivationDate : string,
        IsDelete : number) : Promise<boolean>{

        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                //if(isExist)
                //    sql = "UPDATE Ticker set BackupDate = ?, FormatedDate = ?, FileName = ? WHERE Id = 1";
                //else
                    sql = `UPDATE Ticker SET
                                        TickerId = ?,
                                        Name = ?,
                                        Texts = ?,
                                        Priority = ? ,
                                        Active = ? ,
                                        ActivationDate = ? ,
                                        DeactivationDate = ? ,
                                        IsDelete = ? 
                            WHERE TickerId = ?`;
    
                db.executeSql(sql, [TickerId,
                                    Name,
                                    Texts,
                                    Priority,
                                    Active,
                                    ActivationDate,
                                    DeactivationDate,
                                    IsDelete,
                                    TickerId])
                .then((data) => {
                    console.log("Ticker updated SQL Insert Execute");
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

    saveOrUpdateTickerBatch(datas) {
        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                for (var i = 0 ; datas.length ; i++){
                    this.getTickerByTickerId(datas[i]['ID'])
                    .then(dataExist => {
                        if(dataExist['Id'] != undefined){
                            var sql = "";
                            sql = `INSERT INTO Ticker (TickerId, 
                                                Name,
                                                Texts,
                                                Priority,
                                                Active,
                                                ActivationDate,
                                                DeactivationDate,
                                                IsDelete) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
                            db.executeSql(sql, [datas[i]['ID'],
                                                datas[i]['Name'],
                                                datas[i]['Text'],
                                                datas[i]['Priority'],
                                                datas[i]['Active'],
                                                datas[i]['ActivationDate'],
                                                datas[i]['DeactivationDate'],
                                                datas[i]['IsDelete']])
                            .then((data) => {
                                console.log("Ticker inserted SQL Insert Execute");
                                resolve(true);
                            })
                            .catch((error) =>
                            {
                                console.error("err save",error);
                                resolve(false);
                            });
                        } else {
                            var sql = "";
                            sql = `INSERT INTO Ticker (TickerId, 
                                                Name,
                                                Texts,
                                                Priority,
                                                Active,
                                                ActivationDate,
                                                DeactivationDate,
                                                IsDelete) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
                            db.executeSql(sql, [
                                            datas[i]['ID'],
                                            datas[i]['Name'],
                                            datas[i]['Text'],
                                            datas[i]['Priority'],
                                            datas[i]['Active'],
                                            datas[i]['ActivationDate'],
                                            datas[i]['DeactivationDate'],
                                            datas[i]['IsDelete']
                                        ])
                            .then((data) => {
                                console.log("Ticker inserted SQL Insert Execute");
                            })
                            .catch((error) =>
                            {
                                console.error("err save",error);
                            });
                        }
                    })
                    .catch(err =>  {

                    })
                    
                }
                if(i == datas.length - 1){
                    resolve(true);
                }
            });
        });
    }

    saveTicker(
        TickerId: number, 
        Name: string,
        Texts : string,
        Priority : number,
        Active : number,
        ActivationDate : string,
        DeactivationDate : string,
        IsDelete : number) : Promise<boolean>
    {
       //var isExist = await this.isDataExist();
       
       return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                    sql = `INSERT INTO Ticker (TickerId, 
                                        Name,
                                        Texts,
                                        Priority,
                                        Active,
                                        ActivationDate,
                                        DeactivationDate,
                                        IsDelete) 
                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                db.executeSql(sql, [TickerId,
                                Name,
                                Texts,
                                Priority,
                                Active,
                                ActivationDate,
                                DeactivationDate,
                                IsDelete])
                .then((data) => {
                    console.log("Ticker inserted SQL Insert Execute");
                    resolve(true);
                })
                .catch((error) =>
                {
                    console.error("err save",error);
                    resolve(false);
                });
            });
        });
    }

    isDataExist(TickerId) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
            let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM Ticker where TickerId = ?", [TickerId])
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

    deleteAllTicker(TickerId) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql("Delete FROM Ticker Where TickerId = ?", [TickerId])
            .then((data) => {
                console.log(data);
            }, (error) => {
                console.log(error);
            });
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    createObject(Id: number,
        TickerId: number, 
        Name: string,
        Texts : string,
        Priority : number,
        Active : number,
        ActivationDate : string,
        DeactivationDate : string,
        IsDelete : number
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "TickerId" : TickerId,
            "Name" : Name,
            "Texts" : Texts,
            "Priority" : Priority,
            "Active" : Active,
            "ActivationDate" : ActivationDate,
            "DeactivationDate" : DeactivationDate,
            "IsDelete" : IsDelete,
        }

        return object;
    }

    getTickerByTickerId(ticker){
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
                let multmedia = {};
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM Ticker where TickerId = ? Limit 1", [ticker])
                    .then((data) => {
                        if(data.rows.length > 0) {
                            for(let i = 0; i < data.rows.length; i++) {
                                multmedia = this.createObject(data.rows.item(i).Id,
                                                            data.rows.item(i).TickerId, 
                                                            data.rows.item(i).Name, 
                                                            data.rows.item(i).Texts, 
                                                            data.rows.item(i).Priority, 
                                                            data.rows.item(i).Active, 
                                                            data.rows.item(i).ActivationDate, 
                                                            data.rows.item(i).DeactivationDate, 
                                                            data.rows.item(i).IsDelete)
                                
                            }
                        }
                        //console.log(user);
                        resolve(multmedia);
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

    public getTicker() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let tickers = [];
            let ticker = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM Ticker WHERE IsDelete = 'F' ORDER BY Priority", [])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            ticker = this.createObject(data.rows.item(i).Id,
                                                    data.rows.item(i).TickerId, 
                                                    data.rows.item(i).Name, 
                                                    data.rows.item(i).Texts, 
                                                    data.rows.item(i).Priority, 
                                                    data.rows.item(i).Active, 
                                                    data.rows.item(i).ActivationDate, 
                                                    data.rows.item(i).DeactivationDate, 
                                                    data.rows.item(i).IsDelete);
                                                    tickers.push(ticker);
                            
                        }
                    }
                    //console.log(user);
                    resolve(tickers);
                }, (error) => {
                    console.log("err get ticker", error);
                    reject(error);
                });
            })
            .catch((error) =>
            {
                reject(error);
            });
        });
    }

    deleteTicker(TickerId) : Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("Delete FROM Ticker Where TickerId = ?", [TickerId])
                .then((data) => {
                    resolve(true)
                    console.log(data);
                }, (error) => {
                    resolve(false)
                    console.log(error);
                });
            })
            .catch((error) =>
            {
                resolve(false)
                console.log(error);
            });
        });
    }
    
}