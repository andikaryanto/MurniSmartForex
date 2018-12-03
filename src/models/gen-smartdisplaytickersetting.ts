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
    async saveSmartDisplayTickerSettings(TickerSettings){
        await this.dbSmartDisplayTickerSettings.saveSmartDisplayTickerSettings(
                                                                TickerSettings['Id'],
                                                                TickerSettings['FontName'],
                                                                TickerSettings['FontSize'],
                                                                TickerSettings['FontColour'],
                                                                TickerSettings['BGColour'],
                                                                TickerSettings['Separator'],
                                                                TickerSettings['Separator_ImageFilePath'],
                                                                TickerSettings['Separator_Line'],
                                                                TickerSettings['Separator_LineColour'],
                                                                TickerSettings['Separator_LineThickness'],
                                                                TickerSettings['Separator_SymbolFilePath'],
                                                                TickerSettings['Separator_SymbolColour'],
                                                                TickerSettings['Delay'],
                                                                TickerSettings['Step'],
                                                                TickerSettings['DelayPotrait'],
                                                                TickerSettings['StepPotrait'])
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
        return this.dbSmartDisplayTickerSettings.createObjectSmartDisplayTickerSettings(
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