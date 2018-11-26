import { Injectable } from "@angular/core";
import { DbSmartDisplayPlayerConfigurationProvider } from "../providers/database/dbSmartDisplayPlayerConfiguration";

@Injectable()
export class SmartDisplayPlayerConfigurationModel
{
    constructor(private dbSmartDisplayPlayerConfiguration : DbSmartDisplayPlayerConfigurationProvider)
    {

    }

    async init(){
        await this.dbSmartDisplayPlayerConfiguration.init();
    }

    saveSmartDisplayPlayerConfiguration(playerConfiguration){
        this.dbSmartDisplayPlayerConfiguration.saveSmartDisplayPlayerConfiguration(playerConfiguration['LayoutOrientation'][0],
                                                                playerConfiguration['LayoutContain'][0],
                                                                playerConfiguration['LayoutTemplate'][0]);
    }

    
    async getSmartDisplayPlayerConfiguration(){
        var data = await this.dbSmartDisplayPlayerConfiguration.getSmartDisplayPlayerConfiguration();
        return data;
    }
}
