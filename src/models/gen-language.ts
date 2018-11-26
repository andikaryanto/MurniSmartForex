import { DbLanguageProvider } from "../providers/database/dbLanguage";
import { Injectable } from "@angular/core";
import { Language } from "../enum/enums";
import * as Enums from './../enum/enums'


@Injectable()
export class LanguageModel
{
    constructor(private dbLanguage : DbLanguageProvider)
    {

    }

    async getLanguage()
    {
        var setting = {};
        try{
            let data = await this.dbLanguage.getLanguage();
            var languageString =  this.getStringLanguage(data['Language']);
            setting = this.createObject(data['Id'], 
                                        data['Language'],
                                        languageString
                                    );
        }
        catch
        {
            setting = this.createObject(null, null, null);
        }
        //console.log(setting);
        
        return setting;

    }

    updatelanguageColumn(Column : string, Value : string)
    {
        this.dbLanguage.updateLanguageColumn(Column, Value);
    }

    createObject(Id : number, 
        Language: number,
        LanguageString : string)
    {
        let object = {};
        object = {
            "Id" : Id,
            "Language" : Language,
            "LanguageString" : LanguageString
        }

        return object;  
    }

    async getAvalaibaleLanguage() 
    {
        var language : Array<{Id : number, Language : string, Selected : boolean}>;
        language = [
                      {Id : Enums.Language.Indonesia, Language : "Indonesia", Selected : false},
                      {Id : Enums.Language.English, Language : "English", Selected : false},
                   ];
        var data = await this.dbLanguage.getLanguage();
        for(let i = 0 ; i < language.length; i++)
        {
            //console.log(data["Language"] + " i " +  i);
            if(data["Language"] === language[i].Id)
                language[i].Selected = true;
            else 
                language[i].Selected = false;
        }
        return language;
    }

    getStringLanguage(id) : string
    {
        var result = "";
        if(id === Enums.Language.Indonesia)
            result = "Indonesa";
        else
            result = "English";
        return result;
    }
}