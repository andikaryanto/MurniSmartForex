import { Injectable } from "@angular/core";
import { DbSmartDisplayContainSettingProvider } from "../providers/database/dbSmartDisplayContainSetting";

@Injectable()
export class SmartDisplayContainSettingModel
{
    constructor(private dbSmartDisplayContainSettingProvider : DbSmartDisplayContainSettingProvider)
    {

    }

    async init(){
        await this.dbSmartDisplayContainSettingProvider.init();
    }

    saveSmartDisplayContainSetting(containSetting){
        this.dbSmartDisplayContainSettingProvider.saveSmartDisplayContainSetting(containSetting['Logo_IsShow'][0],
                                                            containSetting['Banner_Date_Time_IsShow'][0],
                                                            containSetting['Forex_IsShow'][0],
                                                            containSetting['Board_IsShow'][0],
                                                            containSetting['Multimedia_IsShow'][0],
                                                            containSetting['Running_Text_IsShow'][0]);
    }

    async getSmartDisplayContainSetting(){
        var data = await this.dbSmartDisplayContainSettingProvider.getSmartDisplayContainSetting();
        return data;
    }
    
}