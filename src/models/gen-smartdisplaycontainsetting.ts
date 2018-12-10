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
        console.log("containSetting", containSetting);
        this.dbSmartDisplayContainSettingProvider.saveSmartDisplayContainSetting(
            containSetting['Logo_IsShow'],
            containSetting['Logo_Percent_Height_L'],
            containSetting['Logo_Percent_Width_L'],
            containSetting['Logo_Percent_Left_L'],
            containSetting['Logo_Percent_Top_L'],
            containSetting['Logo_Percent_Height_P'],
            containSetting['Logo_Percent_Width_P'],
            containSetting['Logo_Percent_Left_P'],
            containSetting['Logo_Percent_Top_P'],
            
            containSetting['Banner_Date_Time_IsShow'],
            containSetting['Banner_Date_Time_Percent_Height_L'],
            containSetting['Banner_Date_Time_Percent_Width_L'],
            containSetting['Banner_Date_Time_Percent_Left_L'],
            containSetting['Banner_Date_Time_Percent_Top_L'],
            containSetting['Banner_Date_Time_Percent_Height_P'],
            containSetting['Banner_Date_Time_Percent_Width_P'],
            containSetting['Banner_Date_Time_Percent_Left_P'],
            containSetting['Banner_Date_Time_Percent_Top_P'],
                
            containSetting['Forex_IsShow'],
            containSetting['Forex_Percent_Height_L'],
            containSetting['Forex_Percent_Width_L'],
            containSetting['Forex_Percent_Left_L'],
            containSetting['Forex_Percent_Top_L'],
            containSetting['Forex_Percent_Height_P'],
            containSetting['Forex_Percent_Width_P'],
            containSetting['Forex_Percent_Left_P'],
            containSetting['Forex_Percent_Top_P '],
            
            containSetting['Board_IsShow'],
            containSetting['Board_Percent_Height_L'],
            containSetting['Board_Percent_Width_L'],
            containSetting['Board_Percent_Left_L'],
            containSetting['Board_Percent_Top_L'],
            containSetting['Board_Percent_Height_P'],
            containSetting['Board_Percent_Width_P'],
            containSetting['Board_Percent_Left_P'],
            containSetting['Board_Percent_Top_P'],
            
            containSetting['Multimedia_IsShow'],
            containSetting['Multimedia_Percent_Height_L'],
            containSetting['Multimedia_Percent_Width_L'],
            containSetting['Multimedia_Percent_Left_L'],
            containSetting['Multimedia_Percent_Top_L'],
            containSetting['Multimedia_Percent_Height_P'],
            containSetting['Multimedia_Percent_Width_P'],
            containSetting['Multimedia_Percent_Left_P'],
            containSetting['Multimedia_Percent_Top_P'],
            
            containSetting['Running_Text_IsShow'],
            containSetting['Running_Text_Percent_Height_L'],
            containSetting['Running_Text_Percent_Width_L'],
            containSetting['Running_Text_Percent_Left_L'],
            containSetting['Running_Text_Percent_Top_L'],
            containSetting['Running_Text_Percent_Height_P'],
            containSetting['Running_Text_Percent_Width_P'],
            containSetting['Running_Text_Percent_Left_P'],
            containSetting['Running_Text_Percent_Top_P'],

            containSetting['RSSFeed_IsShow'],
            containSetting['RSSFeed_Percent_Height_L'],
            containSetting['RSSFeed_Percent_Width_L'],
            containSetting['RSSFeed_Percent_Left_L'],
            containSetting['RSSFeed_Percent_Top_L'],
            containSetting['RSSFeed_Percent_Height_P'],
            containSetting['RSSFeed_Percent_Width_P'],
            containSetting['RSSFeed_Percent_Left_P'],
            containSetting['RSSFeed_Percent_Top_P']);
    }

    createObject(Id, 
        Logo_IsShow,
        Logo_Percent_Height_L,
        Logo_Percent_Width_L,
        Logo_Percent_Left_L,
        Logo_Percent_Top_L,
        Logo_Percent_Height_P,
        Logo_Percent_Width_P,
        Logo_Percent_Left_P ,
        Logo_Percent_Top_P,
        Banner_Date_Time_IsShow, 
        Banner_Date_Time_Percent_Height_L,
        Banner_Date_Time_Percent_Width_L,
        Banner_Date_Time_Percent_Left_L,
        Banner_Date_Time_Percent_Top_L,
        Banner_Date_Time_Percent_Height_P,
        Banner_Date_Time_Percent_Width_P,
        Banner_Date_Time_Percent_Left_P ,
        Banner_Date_Time_Percent_Top_P,
        Forex_IsShow ,
        Forex_Percent_Height_L, 
        Forex_Percent_Width_L,
        Forex_Percent_Left_L,
        Forex_Percent_Top_L,
        Forex_Percent_Height_P,
        Forex_Percent_Width_P,
        Forex_Percent_Left_P,
        Forex_Percent_Top_P ,
        Board_IsShow ,
        Board_Percent_Height_L, 
        Board_Percent_Width_L,
        Board_Percent_Left_L,
        Board_Percent_Top_L,
        Board_Percent_Height_P,
        Board_Percent_Width_P,
        Board_Percent_Left_P,
        Board_Percent_Top_P ,
        Multimedia_IsShow ,
        Multimedia_Percent_Height_L, 
        Multimedia_Percent_Width_L,
        Multimedia_Percent_Left_L,
        Multimedia_Percent_Top_L,
        Multimedia_Percent_Height_P,
        Multimedia_Percent_Width_P,
        Multimedia_Percent_Left_P,
        Multimedia_Percent_Top_P ,
        Running_Text_IsShow ,
        Running_Text_Percent_Height_L, 
        Running_Text_Percent_Width_L,
        Running_Text_Percent_Left_L,
        Running_Text_Percent_Top_L,
        Running_Text_Percent_Height_P,
        Running_Text_Percent_Width_P,
        Running_Text_Percent_Left_P,
        Running_Text_Percent_Top_P ,
        RSSFeed_IsShow ,
        RSSFeed_Percent_Height_L, 
        RSSFeed_Percent_Width_L,
        RSSFeed_Percent_Left_L,
        RSSFeed_Percent_Top_L,
        RSSFeed_Percent_Height_P,
        RSSFeed_Percent_Width_P,
        RSSFeed_Percent_Left_P,
        RSSFeed_Percent_Top_P 
        ){
        console.log("Logo_IsShow", Logo_IsShow);
        return this.dbSmartDisplayContainSettingProvider.createObjectSmartDisplayContainSetting(Id,
            Logo_IsShow,
            Logo_Percent_Height_L,
            Logo_Percent_Width_L,
            Logo_Percent_Left_L,
            Logo_Percent_Top_L,
            Logo_Percent_Height_P,
            Logo_Percent_Width_P,
            Logo_Percent_Left_P ,
            Logo_Percent_Top_P,
            Banner_Date_Time_IsShow,
            Banner_Date_Time_Percent_Height_L,
            Banner_Date_Time_Percent_Width_L,
            Banner_Date_Time_Percent_Left_L,
            Banner_Date_Time_Percent_Top_L,
            Banner_Date_Time_Percent_Height_P,
            Banner_Date_Time_Percent_Width_P,
            Banner_Date_Time_Percent_Left_P ,
            Banner_Date_Time_Percent_Top_P,
            Forex_IsShow,
            Forex_Percent_Height_L, 
            Forex_Percent_Width_L,
            Forex_Percent_Left_L,
            Forex_Percent_Top_L,
            Forex_Percent_Height_P,
            Forex_Percent_Width_P,
            Forex_Percent_Left_P,
            Forex_Percent_Top_P,
            Board_IsShow,
            Board_Percent_Height_L, 
            Board_Percent_Width_L,
            Board_Percent_Left_L,
            Board_Percent_Top_L,
            Board_Percent_Height_P,
            Board_Percent_Width_P,
            Board_Percent_Left_P,
            Board_Percent_Top_P,
            Multimedia_IsShow,
            Multimedia_Percent_Height_L, 
            Multimedia_Percent_Width_L,
            Multimedia_Percent_Left_L,
            Multimedia_Percent_Top_L,
            Multimedia_Percent_Height_P,
            Multimedia_Percent_Width_P,
            Multimedia_Percent_Left_P,
            Multimedia_Percent_Top_P,
            Running_Text_IsShow,
            Running_Text_Percent_Height_L, 
            Running_Text_Percent_Width_L,
            Running_Text_Percent_Left_L,
            Running_Text_Percent_Top_L,
            Running_Text_Percent_Height_P,
            Running_Text_Percent_Width_P,
            Running_Text_Percent_Left_P,
            Running_Text_Percent_Top_P ,
            RSSFeed_IsShow,
            RSSFeed_Percent_Height_L, 
            RSSFeed_Percent_Width_L,
            RSSFeed_Percent_Left_L,
            RSSFeed_Percent_Top_L,
            RSSFeed_Percent_Height_P,
            RSSFeed_Percent_Width_P,
            RSSFeed_Percent_Left_P,
            RSSFeed_Percent_Top_P
            );
    }

    async getSmartDisplayContainSetting(){
        var data = await this.dbSmartDisplayContainSettingProvider.getSmartDisplayContainSetting();
        return data;
    }
    
}