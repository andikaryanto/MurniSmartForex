import { Injectable } from "@angular/core";
import { Language } from "../enum/enums";
import * as Enums from './../enum/enums'
import { DbSftpProvider } from "../providers/database/dbSftp";
import { DbServerProvider } from "../providers/database/dbServer";


@Injectable()
export class SftpModel
{
    constructor(private dbSftpProvider : DbSftpProvider,
                private dbServerProvider : DbServerProvider)
    {

    }

    async init(){
        await this.dbSftpProvider.init();
    }

    async saveSftp(sftp){
        await this.deleteSftp();
        await this.dbSftpProvider.saveSftp(sftp['Username'], sftp['Password']);
    }

    async getSftp(){
        var newData = {};
        try
        {
            var data = await this.dbSftpProvider.getSftp();
            var server = await this.dbServerProvider.getServer();
            newData = this.createObject(data['Id'], data['Username'], data['Password'], server['ServerIP']);
        }
        catch
        {
            newData = this.createObject(null, null, null, null);
        }
       
        return newData;
    }

    createObject(id, username, password, ipAddress = null){
        var data = this.dbSftpProvider.createObject(id, username, password, ipAddress);
        return data;

    }

    async deleteSftp(){
        await this.dbSftpProvider.deleteSftp();
    }
}