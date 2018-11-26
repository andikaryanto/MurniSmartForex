import { Injectable } from "@angular/core";
import { DbBackUpStatusProvider } from "../providers/database/dbBackupStatus";

@Injectable()
export class BackupStatusModel
{
    constructor(private dbBackUpStatuProvider : DbBackUpStatusProvider)
    {

    }

    async init(){
        await this.dbBackUpStatuProvider.init();
    }

    async getBackUpStatus(){
        var data = await this.dbBackUpStatuProvider.getBackUpStatus();
        console.log(data);
        return data;
    }

    saveBackUpStatus(backupStatus){
        this.dbBackUpStatuProvider.saveBackUpStatus(backupStatus['BackupDate'],
                                                    backupStatus['FormatedDate'],
                                                    backupStatus['FileName']);
    }

    createObject(id, backUpDate, FormatedDate, fileName){
        return this.dbBackUpStatuProvider.createObject(id, backUpDate, FormatedDate, fileName);
    }
}
