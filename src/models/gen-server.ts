import { Injectable } from "@angular/core";
import { DbServerProvider } from "../providers/database/dbServer";

@Injectable()
export class ServerModel
{
    constructor(private dbServerProvider : DbServerProvider)
    {

    }

    async init(){
        await this.dbServerProvider.init();
    }

    async saveServer(server){
        await this.deleteServer();
        await this.dbServerProvider.saveServer(server['ServerIP'], server['ServerPort']);
        //await this.dbServerProvider.updateServer("ServerPort", server['ServerPort']);
    }

    async getServer(){
        var newData = {};
        try
        {
            var server = await this.dbServerProvider.getServer();
            newData = this.createObject(server['Id'], server['ServerIP'], server['ServerPort']);
        }
        catch
        {
            newData = this.createObject(null, null, null);
        }
       
        return newData;
    }

    createObject(id, serverIP, serverPort){
        var data = this.dbServerProvider.createObjectServer(id, serverIP, serverPort);
        return data;

    }

    async deleteServer(){
        await this.dbServerProvider.deleteServer();
    }
    
}