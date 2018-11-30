import { Injectable } from "@angular/core";
import { DbSmartDisplayTickerSettingsProvider } from "../providers/database/dbSmartDisplayTickerSettings";

@Injectable()
export class SmartDisplayTickerSettingsModel{
    constructor(private dbSmartDisplayTickerSettings : DbSmartDisplayTickerSettingsProvider)
    {

    }
    async init(){
        await this.dbSmartDisplayTickerSettings.init();
    }
    saveSmartDisplayTickerSettings(TickerSettings){
        this.dbSmartDisplayTickerSettings.saveSmartDisplayTickerSettings(
                                                                TickerSettings['FontName'][0],
                                                                TickerSettings['FontSize'][0],
                                                                TickerSettings['FontColour'][0],
                                                                TickerSettings['BGColour'][0],
                                                                TickerSettings['Separator'][0],
                                                                TickerSettings['Separator_ImageFilePath'][0],
                                                                TickerSettings['Separator_Line'][0],
                                                                TickerSettings['Separator_LineColour'][0],
                                                                TickerSettings['Separator_LineThickness'][0],
                                                                TickerSettings['Separator_SymbolFilePath'][0],
                                                                TickerSettings['Separator_SymbolColour'][0],
                                                                TickerSettings['Delay'][0],
                                                                TickerSettings['Step'][0],
                                                                TickerSettings['DelayPotrait'][0],
                                                                TickerSettings['StepPotrait'][0])
    }

    async getSmartDisplayTickerSettings(){
        var data = await this.dbSmartDisplayTickerSettings.getSmartDisplayTickerSettings();
        return data;
    }

    createObjectSmartDisplayTickerSettings(Id : number, 
        FontName: string, 
        FontSize: number,
        FontColour: string, 
        BGColour: string,  
        Separator: string , 
        Separator_ImageFilePath: string,
        Separator_Line: number, 
        Separator_LineColour: string,  
        Separator_LineThickness : number,
        Separator_SymbolFilePath: string, 
        Separator_SymbolColour: string,
        Delay: number, 
        Step: number,  
        DelayPotrait : number,
        StepPotrait : number
    )
    {
        this.dbSmartDisplayTickerSettings.createObjectSmartDisplayTickerSettings(
            Id,
            FontName,
            FontSize,
            FontColour,
            BGColour,
            Separator,
            Separator_ImageFilePath,
            Separator_Line,
            Separator_LineColour,
            Separator_LineThickness,
            Separator_SymbolFilePath,
            Separator_SymbolColour,
            Delay,
            Step,
            DelayPotrait,
            StepPotrait
        )
    }

}