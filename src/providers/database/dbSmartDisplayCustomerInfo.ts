import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DbSmartDisplayCustomerInfoProvider{

    addColumnsSmartDisplayCustomerInfo : any[] ;
    public constructor(private storage: SQLite){
        //this.init();
    } 

    async init(){
        //Database SmartDisplayCustomerInfo
        this.createDatabaseSmartDisplayCustomerInfo()
        .then(async result => {
            if(result){
                this.addColumnSmartDisplayCustomerInfo();
                await this.alterTableSmartDisplayCustomerInfo();
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    //#region SmartDisplayCustomerInfo
    createDatabaseSmartDisplayCustomerInfo() : Promise<boolean>
    {
        return new Promise((resolve, reject) =>
        {
            this.storage.create({
                name: 'data.db',
                location: 'default'
            }).
            then((db: SQLiteObject)=>{
                db.executeSql(`CREATE TABLE IF NOT EXISTS SmartDisplayCustomerInfo
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

    addColumnSmartDisplayCustomerInfo()
    {
        this.addColumnsSmartDisplayCustomerInfo = [];
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "PlayerID", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "CustomerName", DataType : "varchar(200)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "BranchName", DataType : "varchar(200)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "BranchAddress", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "ContactPerson", DataType : "varchar(100)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "Phone", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "MobilePhone", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "Email", DataType : "varchar(20)"});
        this.addColumnsSmartDisplayCustomerInfo.push({Column : "LastUpdate", DataType : "varchar(100)"});
        //console.log(this.addColumnsSmartDisplayCustomerInfo)
    }

    public getSmartDisplayCustomerInfo() {
        return new Promise((resolve, reject) => {
        // var db : SQLiteObject
        
            let demoSetting = {};
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM SmartDisplayCustomerInfo where Id = ?", [1])
                .then((data) => {
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            demoSetting = this.createObjectSmartDisplayCustomerInfo(data.rows.item(i).Id,
                                                        data.rows.item(i).PlayerID,
                                                        data.rows.item(i).CustomerName, 
                                                        data.rows.item(i).BranchName,
                                                        data.rows.item(i).BranchAddress,
                                                        data.rows.item(i).ContactPerson,
                                                        data.rows.item(i).Phone,
                                                        data.rows.item(i).MobilePhone,
                                                        data.rows.item(i).Email,
                                                        data.rows.item(i).LastUpdate);
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

    async alterTableSmartDisplayCustomerInfo()
    {
        for(let i = 0 ; i < this.addColumnsSmartDisplayCustomerInfo.length ; i ++)
        {
            var isColumExist = await this.isColumnExistSmartDisplayCustomerInfo(this.addColumnsSmartDisplayCustomerInfo[i].Column);
            if(!isColumExist)
            {

                var columName = this.addColumnsSmartDisplayCustomerInfo[i].Column;
                var dataType = this.addColumnsSmartDisplayCustomerInfo[i].DataType;
                //console.log(columName +" "+ dataType);
                this.storage.create({
                   name: 'data.db',
                   location: 'default'
                }
                )
                .then((db: SQLiteObject) => {
                    db.executeSql("ALTER TABLE SmartDisplayCustomerInfo ADD COLUMN "+columName+" "+ dataType, [])
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

    async saveSmartDisplayCustomerInfo(
        PlayerID: string, 
        CustomerName: string, 
        BranchName : string , 
        BranchAddress : string,
        ContactPerson : string,
        Phone : string,
        MobilePhone : string,
        Email : string,
        LastUpdate : string) 
    {
        this.storage.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(`INSERT INTO SmartDisplayCustomerInfo (PlayerID, 
                                                    CustomerName, 
                                                    BranchName, 
                                                    BranchAddress,
                                                    ContactPerson,
                                                    Phone,
                                                    MobilePhone,
                                                    Email,
                                                    LastUpdate) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [PlayerID, 
                                                    CustomerName, 
                                                    BranchName, 
                                                    BranchAddress,
                                                    ContactPerson,
                                                    Phone,
                                                    MobilePhone,
                                                    Email,
                                                    LastUpdate])
            .then((data) => {
                console.log("Cust info SQL Insert Execute");
                //resolve(data);
            })
            .catch(err => {
                console.error(err);
            });
        });
    }

    async updateSmartDisplayCustomerInfo(Column : string, Value : any)
    {
       var isExist = await this.isDataExistSmartDisplayCustomerInfo();
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                var sql = "";
                if(isExist)
                    sql = "UPDATE SmartDisplayCustomerInfo set "+Column+" = ? WHERE Id = 1";
                else
                    sql = "INSERT INTO SmartDisplayCustomerInfo("+Column+") Values(?)";
                    
                db.executeSql(sql, [Value])
                .then((data) => {
                    console.log("SQL Updated");
                    //resolve(data);
                }, (error) => {
                    //reject(error);
                });
            });
        
    }

    isColumnExistSmartDisplayCustomerInfo(columnName : string) : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            //let isExist = false;
            this.storage.create({
                name: 'data.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql("SELECT "+columnName+" from SmartDisplayCustomerInfo where 1 = 2", [])
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

    createObjectSmartDisplayCustomerInfo(Id : number, 
        PlayerID: string, 
        CustomerName: string, 
        BranchName : string , 
        BranchAddress : string,
        ContactPerson : string,
        Phone : string,
        MobilePhone : string,
        Email : string,
        LastUpdate : string
    ) : {}
    {
        let object = {};
        object = {
            "Id" : Id,
            "PlayerID" : PlayerID,
            "CustomerName" : CustomerName,
            "BranchName" : BranchName,
            "BranchAddress" : BranchAddress,
            "ContactPerson" : ContactPerson,
            "Phone" : Phone,
            "MobilePhone": MobilePhone,
            "Email" : Email,
            "LastUpdate": LastUpdate
        }

        return object;
    }

    isDataExistSmartDisplayCustomerInfo() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            // var db : SQLiteObject
            
                let isExist = false;
                this.storage.create({
                    name: 'data.db',
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    db.executeSql("SELECT * FROM SmartDisplayCustomerInfo where Id = 1", [])
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