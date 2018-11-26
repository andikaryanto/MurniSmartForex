import { Injectable } from "@angular/core";
import { DbRestoreStatusProvider } from "../providers/database/dbRestoreStatus";

@Injectable()
export class RestoreStatusModel
{
    constructor(private dbRestoreStatuProvider : DbRestoreStatusProvider)
    {

    }

    async init(){
        await this.dbRestoreStatuProvider.init();
    }

    async getRestoreStatus(){
        var data = await this.dbRestoreStatuProvider.getRestoreStatus();
        console.log(data);
        return data;
    }

    saveRestoreStatus(backupStatus){
        this.dbRestoreStatuProvider.saveRestoreStatus(backupStatus['RestoreDate'],
                                                    backupStatus['FileName']);
    }

    createObject(id, backUpDate, fileName){
        return this.dbRestoreStatuProvider.createObject(id, backUpDate, fileName);
    }
}
