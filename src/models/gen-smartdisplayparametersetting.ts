import { Injectable } from "@angular/core";
import { DbSmartDisplayParameterSettingProvider } from "../providers/database/dbSmartDisplayParameterSetting";

@Injectable()
export class SmartDisplayParameterSettingModel
{
    constructor(private dbSmartDisplayParameterSettingProvider : DbSmartDisplayParameterSettingProvider)
    {

    }

    async init(){
        await this.dbSmartDisplayParameterSettingProvider.init();
    }

    saveSmartDisplayParameterSetting(parameterSetting){
        this.dbSmartDisplayParameterSettingProvider.saveSmartDisplayParameterSetting(parameterSetting['Application_Filepath'][0],
                                                            parameterSetting['Customer_Admin_GroupID'][0],
                                                            parameterSetting['FTP_End_Time'][0],
                                                            parameterSetting['FTP_Interval'][0],
                                                            parameterSetting['FTP_Start_Time'][0],
                                                            parameterSetting['Multimedia_FilePath'][0],
                                                            parameterSetting['Update_Version_Interval'][0]);
    }
    

    async getSmartDisplayCustomerInfo(){
        var data = await this.dbSmartDisplayParameterSettingProvider.getSmartDisplayParameterSetting();
        return data;
    }


}