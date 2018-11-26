import { IDemoSetting } from '../interfaces/idemoSetting';
import { DbDemoSettingProvider } from '../providers/database/dbDemoSetting';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { Injectable } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import * as Enum from '../enum/enums';
import { Resource } from '../helper/gen-resources';

@Injectable()
export class DemoSettingModel
{
    constructor(private dbProvider : DbDemoSettingProvider,
                private resource : Resource)
    {
        //this.dbProvider.createDatabaseUser();
    }

    async init(){
        await this.dbProvider.init();
    }

    async getDemoSetting()
    {
        var setting = {};
        try{
            let data = await this.dbProvider.getDemoSetting();
            var screenOr = this.getStringScreenOrientation(data['ScreenOrientation']);
            var template = await this.getStringTemplate(data['TabularTemplate']);
            setting = this.createObject(data['Id'], 
                                        data['ScreenOrientation'], 
                                        screenOr,
                                        data['UseTicker'],
                                        data['ImageFolder'],
                                        data['VideoFolder'],
                                        data["MultimediaPriority"],
                                        data['TabularTemplate'],
                                        template,
                                        data['TabularMaxColumn'],
                                        data['TabularMaxFixedRow'],
                                        data['TabularMulmedType'],
                                        data['TabularFooterText'],
                                        data['TabularMaxDynamicRow']

                                    );
        }
        catch
        {
            setting = this.createObject(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        }
        //console.log(setting);
        
        return setting;

    }

    saveDemoSetting(Id : number, 
        ScreenOrientation: number, 
        UseTicker: number, 
        ImageFolder : string , 
        VideoFolder : string,
        MultimediaPriority : number,
        TabularTemplate : number, 
        TabularMaxColumn : number,
        TabularMaxFixedRow : number,
        TabularMulmedType : number,
        TabularFooterText : string,
        TabularMaxDynamicRow : number)
    {
        this.dbProvider.saveDemoSetting(ScreenOrientation, 
                                UseTicker, 
                                ImageFolder, 
                                VideoFolder, 
                                MultimediaPriority,
                                TabularTemplate,
                                TabularMaxColumn,
                                TabularMaxFixedRow,
                                TabularMulmedType,
                                TabularFooterText,
                                TabularMaxDynamicRow)
    }

    updateDemoSetting(ScreenOrientation : number, UseTicker : number, ImageFolder : string , VideoFolder : string)
    {
        this.dbProvider.updateDemoSetting(ScreenOrientation, UseTicker, ImageFolder, VideoFolder)
    }

    updateDemoSettingColumn(Column : string, Value : string)
    {
        this.dbProvider.updateDemoSettingColumn(Column, Value);
    }

    createObject(Id : number, 
                ScreenOrientation: number, 
                ScreenOrientationString: string, 
                UseTicker: number, 
                ImageFolder : string , 
                VideoFolder : string,
                MultimediaPriority : number,
                TabularTemplate : number, 
                TabularTemplateString : string ,
                TabularMaxColumn : number,
                TabularMaxFixedRow : number,
                TabularMulmedType : number,
                TabularFooterText : string,
                TabularMaxDynamicRow : number)
    {
        let object = {};
        object = {
            "Id" : Id,
            "ScreenOrientation" : ScreenOrientation,
            "ScreenOrientationString" : ScreenOrientationString,
            "UseTicker" : UseTicker,
            "ImageFolder" : ImageFolder,
            "VideoFolder" : VideoFolder,
            "MultimediaPriority" : MultimediaPriority,
            "TabularTemplate" : TabularTemplate,
            "TabularTemplateString" : TabularTemplateString,
            "TabularMaxColumn": TabularMaxColumn,
            "TabularMaxFixedRow" : TabularMaxFixedRow,
            "TabularMulmedType" : TabularMulmedType,
            "TabularFooterText" : TabularFooterText,
            "TabularMaxDynamicRow" : TabularMaxDynamicRow
        }

        return object;
    }

    getStringScreenOrientation(value) : string
    {
        var result = "";
        if(value === Enum.ScreenOrientationEnum.Landscape)
            result = "Landscape";
        else
            result = "Potrait";
        
        return result;
    }

    async getStringTemplate(value)
    {
        var result = "";
        await this.resource.getLanguage();
        if(value === Enum.TabularTemplate.WithMultimedia)
            result = this.resource.WithMultimediaRes();
        else
            result = this.resource.WithoutMultimediaRes();
        
        return result;
    }


}