import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbMultimediaProvider
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
                db.executeSql(`CREATE TABLE IF NOT EXISTS Multimedia
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
        this.addColumns.push({Column : "MultimediaId", DataType : "varchar(10)"});
        this.addColumns.push({Column : "Code", DataType : "varchar(255)"});
        this.addColumns.push({Column : "Name", DataType : "varchar(255)"});
        this.addColumns.push({Column : "FileName", DataType : "varchar(255)"});
        this.addColumns.push({Column : "FileMusic", DataType : "varchar(255)"});
        this.addColumns.push({Column : "MultimediaType", DataType : "int"});
        this.addColumns.push({Column : "Duration", DataType : "varchar(25)"});
        this.addColumns.push({Column : "Active", DataType : "int"});
        this.addColumns.push({Column : "ActivationDate", DataType : "text"});
        this.addColumns.push({Column : "DeactivationDate", DataType : "text"});
        this.addColumns.push({Column : "DeliveryDate", DataType : "text"});
        this.addColumns.push({Column : "FileSize", DataType : "varhcar(10)"});
        this.addColumns.push({Column : "Checksum", DataType : "text"});
        this.addColumns.push({Column : "Path", DataType : "text"});
        this.addColumns.push({Column : "IsDeleted", DataType : "int"});
        this.addColumns.push({Column : "Priority", DataType : "int"});
        this.addColumns.push({Column : "StartTime", DataType : "varchar(10)"});
        this.addColumns.push({Column : "EndTime", DataType : "varchar(10)"});
        this.addColumns.push({Column : "Days", DataType : "varchar(20)"});
        this.addColumns.push({Column : "LocalPath", DataType : "text"});
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
                    db.executeSql("ALTER TABLE Multimedia ADD COLUMN "+columName+" "+ dataType, [])
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
                db.executeSql("SELECT "+columnName+" from Multimedia where 1 = 2", [])
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

    updateMultimedia( Id: number,
        MultimediaId: number, 
        Code :string,
        Name: string,
        FileName : string,
        FileMusic : string,
        MultimediaType : number,
        Duration : string,
        Active : number,
        ActivationDate : string,
        DeactivationDate : string,
        DeliveryDate : string,
        FileSize : string,
        Checksum : string,
        Path : string,
        IsDeleted : number,
        Priority : number,
        StartTime : string,
        EndTime : string,
        Days : string,
        LocalPath : string){

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
                    sql = `UPDATE Multimedia SET
                                        Code = ?,
                                        Name = ?,
                                        FileName = ?,
                                        FileMusic = ?,
                                        MultimediaType = ?,
                                        Duration = ?,
                                        Active = ? ,
                                        ActivationDate = ? ,
                                        DeactivationDate = ? ,
                                        DeliveryDate = ? ,
                                        FileSize = ? ,
                                        Checksum = ? ,
                                        Path = ? ,
                                        IsDeleted = ? ,
                                        Priority = ? ,
                                        StartTime = ? ,
                                        EndTime = ? ,
                                        Days = ? ,
                                        LocalPath  = ?  
                            WHERE Id = ?`;
    
                db.executeSql(sql, [Code,
                                    Name,
                                    FileName,
                                    FileMusic,
                                    MultimediaType,
                                    Duration,
                                    Active,
                                    ActivationDate,
                                    DeactivationDate,
                                    DeliveryDate,
                                    FileSize,
                                    Checksum,
                                    Path,
                                    IsDeleted,
                                    Priority,
                                    StartTime,
                                    EndTime,
                                    Days,
                                    LocalPath,
                                    Id])
                .then((data) => {
                    console.log("Miltimedia updated SQL Insert Execute");
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

    saveMultimedia(
        MultimediaId: number, 
        Code :string,
        Name: string,
        FileName : string,
        FileMusic : string,
        MultimediaType : number,
        Duration : string,
        Active : number,
        ActivationDate : string,
        DeactivationDate : string,
        DeliveryDate : string,
        FileSize : string,
        Checksum : string,
        Path : string,
        IsDeleted : number,
        Priority : number,
        StartTime : string,
        EndTime : string,
        Days : string,
        LocalPath : string) 
    {
       //var isExist = await this.isDataExist();
       
       return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                    sql = `INSERT INTO Multimedia (MultimediaId, 
                                        Code,
                                        Name,
                                        FileName,
                                        FileMusic,
                                        MultimediaType,
                                        Duration,
                                        Active,
                                        ActivationDate,
                                        DeactivationDate,
                                        DeliveryDate,
                                        FileSize,
                                        Checksum,
                                        Path,
                                        IsDeleted,
                                        Priority,
                                        StartTime,
                                        EndTime,
                                        Days,
                                        LocalPath) 
                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                db.executeSql(sql, [MultimediaId, 
                                    Code,
                                    Name,
                                    FileName,
                                    FileMusic,
                                    MultimediaType,
                                    Duration,
                                    Active,
                                    ActivationDate,
                                    DeactivationDate,
                                    DeliveryDate,
                                    FileSize,
                                    Checksum,
                                    Path,
                                    IsDeleted,
                                    Priority,
                                    StartTime,
                                    EndTime,
                                    Days,
                                    LocalPath])
                .then((data) => {
                    console.log("Miltimedia inserted SQL Insert Execute");
                    resolve(true);
                })
                .catch((error) =>
                {
                    console.error(error);
                    resolve(false);
                });
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
                db.executeSql("SELECT * FROM Multimedia", [])
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

    deleteAllMultmedia() 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql("Delete FROM Multimedia", [])
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

    createObject(Id : number, 
        MultimediaId: number, 
        Code :string,
        Name: string,
        FileName : string,
        FileMusic : string,
        MultimediaType : number,
        Duration : string,
        Active : number,
        ActivationDate : string,
        DeactivationDate : string,
        DeliveryDate : string,
        FileSize : string,
        Checksum : string,
        Path : string,
        IsDeleted : number,
        Priority : number,
        StartTime : string,
        EndTime : string,
        Days : string,
        LocalPath : string
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "MultimediaId" : MultimediaId,
            "Code" : Code,
            "Name" : Name,
            "FileName" : FileName,
            "FileMusic" : FileMusic,
            "MultimediaType" : MultimediaType,
            "Duration" : Duration,
            "Active" : Active,
            "ActivationDate" : ActivationDate,
            "DeactivationDate" : DeactivationDate,
            "DeliveryDate" : DeliveryDate,
            "FileSize" : FileSize,
            "Checksum" : Checksum,
            "Path" : Path,
            "IsDeleted" : IsDeleted,
            "Priority" : Priority,
            "StartTime" : StartTime,
            "EndTime" : EndTime,
            "Days" : Days,
            "LocalPath" : LocalPath
        }

        return object;
    }

    getMultimediaByMultimediaId(multimediaId){
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
                let multmedia = {};
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM Multimedia where MultimediaId = ? Limit 1", [multimediaId])
                    .then((data) => {
                        if(data.rows.length > 0) {
                            for(let i = 0; i < data.rows.length; i++) {
                                multmedia = this.createObject(data.rows.item(i).Id,
                                                            data.rows.item(i).MultimediaId, 
                                                            data.rows.item(i).Code,
                                                            data.rows.item(i).Name, 
                                                            data.rows.item(i).FileName, 
                                                            data.rows.item(i).FileMusic, 
                                                            data.rows.item(i).MultimediaType, 
                                                            data.rows.item(i).Duration, 
                                                            data.rows.item(i).Active, 
                                                            data.rows.item(i).ActivationDate, 
                                                            data.rows.item(i).DeactivationDate, 
                                                            data.rows.item(i).DeliveryDate, 
                                                            data.rows.item(i).FileSize, 
                                                            data.rows.item(i).Checksum, 
                                                            data.rows.item(i).Path, 
                                                            data.rows.item(i).IsDeleted, 
                                                            data.rows.item(i).Priority, 
                                                            data.rows.item(i).StartTime, 
                                                            data.rows.item(i).EndTime, 
                                                            data.rows.item(i).Days, 
                                                            data.rows.item(i).LocalPath)
                                
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

    public getMultimedia() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let multimedias = [];
            let multmedia = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT DISTINCT * FROM Multimedia" ,[])
                .then((data) => {
                    console.log(data.rows.length);
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            multmedia = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).MultimediaId, 
                                                        data.rows.item(i).Code,
                                                        data.rows.item(i).Name, 
                                                        data.rows.item(i).FileName, 
                                                        data.rows.item(i).FileMusic, 
                                                        data.rows.item(i).MultimediaType, 
                                                        data.rows.item(i).Duration, 
                                                        data.rows.item(i).Active, 
                                                        data.rows.item(i).ActivationDate, 
                                                        data.rows.item(i).DeactivationDate, 
                                                        data.rows.item(i).DeliveryDate, 
                                                        data.rows.item(i).FileSize, 
                                                        data.rows.item(i).Checksum, 
                                                        data.rows.item(i).Path, 
                                                        data.rows.item(i).IsDeleted, 
                                                        data.rows.item(i).Priority, 
                                                        data.rows.item(i).StartTime, 
                                                        data.rows.item(i).EndTime, 
                                                        data.rows.item(i).Days, 
                                                        data.rows.item(i).LocalPath);
                            multimedias.push(multmedia);
                            
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

    public getMultimediaByType(type) : Promise<any[]>{
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let multimedias = [];
            let multmedia = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT DISTINCT * FROM Multimedia where MultimediaType = ?", [type])
                .then((data) => {
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            multmedia = this.createObject(data.rows.item(i).Id,
                                                        data.rows.item(i).MultimediaId, 
                                                        data.rows.item(i).Code,
                                                        data.rows.item(i).Name, 
                                                        data.rows.item(i).FileName, 
                                                        data.rows.item(i).FileMusic, 
                                                        data.rows.item(i).MultimediaType, 
                                                        data.rows.item(i).Duration, 
                                                        data.rows.item(i).Active, 
                                                        data.rows.item(i).ActivationDate, 
                                                        data.rows.item(i).DeactivationDate, 
                                                        data.rows.item(i).DeliveryDate, 
                                                        data.rows.item(i).FileSize, 
                                                        data.rows.item(i).Checksum, 
                                                        data.rows.item(i).Path, 
                                                        data.rows.item(i).IsDeleted, 
                                                        data.rows.item(i).Priority, 
                                                        data.rows.item(i).StartTime, 
                                                        data.rows.item(i).EndTime, 
                                                        data.rows.item(i).Days, 
                                                        data.rows.item(i).LocalPath);
                            multimedias.push(multmedia);
                        }
                    }
                    //console.log(user);
                    resolve(multimedias);
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

    deleteMultimedia(MultimediaId) : Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("Delete FROM Multimedia Where MultimediaId = ?", [MultimediaId])
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