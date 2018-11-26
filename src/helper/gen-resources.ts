//import { HtmlResource } from "../resources/html";
import * as Enums from '../enum/enums'
import * as HtmlConstant from '../resources/html'
import * as MessagesConstant from '../resources/messages'
import { LanguageModel } from "../models/gen-language";
import { Injectable } from "@angular/core";
import { DbLanguageProvider } from '../providers/database/dbLanguage';

@Injectable()
export class Resource
{
    languages = {};
    constructor(private languageModel : LanguageModel){

                }

    async getLanguage()
    {
        this.languages = await this.languageModel.getLanguage();
        return this.languages;
    }


    /*HTML Area */
    GeneralRes() : string
    {
        //this.languages = 
        if( this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.GeneralId;
        else
            return HtmlConstant.GeneralEn;
    }

    GeneralSettingRes() : string
    {
        //this.languages = 
        if( this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.GeneralSettingId;
        else
            return HtmlConstant.GeneralSettingEn;
    }
    
    MultimediaRes() : string
    {
        //this.languages = 
        if( this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MultimediaId;
        else
            return HtmlConstant.MultimediaEn;
    }

    
    MultimediatypeRes() : string
    {
        //this.languages = 
        if( this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MultimediaTypeId;
        else
            return HtmlConstant.MultimediaTypeEn;
    }


    SettingRes() : string
    {
        //this.getLanguage();
        //this.languages = await this.languageProvider.getLanguage();
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SettingId;
        else
            return HtmlConstant.SettingEn;
    }

    ScreenOrientationRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ScreenOrientationId;
        else
            return HtmlConstant.ScreenOrientationEn;
    }
    
    ImageRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ImagesId;
        else
            return HtmlConstant.ImagesEn;
    }
    
    VideoRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.VideosId;
        else
            return HtmlConstant.VideosEn;
    }

    MaxColumnRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MaxColumnId;
        else
            return HtmlConstant.MaxColumnEn;
    }

    MaxFixedRowRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MaxFixedRowId;
        else
            return HtmlConstant.MaxFixedRowEn;
    }

    MaxDynamicRowRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MaxDynamicRowId;
        else
            return HtmlConstant.MaxDynamicRowEn;
    }

    TabularFooterTextRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.TabularFooterTextId;
        else
            return HtmlConstant.TabularFooterTextEn;
    }

    WithMultimediaRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.WithMultimediaId;
        else
            return HtmlConstant.WithMultimediaEn;
    }

    WithoutMultimediaRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.WithoutMultimediaId;
        else
            return HtmlConstant.WithoutMultimediaEn;
    }
    
    TabularRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.TabularId;
        else
            return HtmlConstant.TabularEn;
    }

    BackupRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.BackupId;
        else
            return HtmlConstant.BackupEn;
    }

    AboutRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.AboutId;
        else
            return HtmlConstant.AboutEn;
    }

    ApplicationInfoRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ApplicationInfoId;
        else
            return HtmlConstant.ApplicationInfoEn;
    }

    
    LastBackupRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.LastBackupId;
        else
            return HtmlConstant.LastBackupEn;
    }
    
    LocalRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.LocalId;
        else
            return HtmlConstant.LocalEn;
    }

    BackUpTextRes() : string {
        if(this.languages["Language"] === Enums.Language.Indonesia)
        return HtmlConstant.BackUpTextId;
    else
        return HtmlConstant.BackUpTextEn;
    }

    ShowTickerRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ShowTickerId;
        else
            return HtmlConstant.ShowTickerEn;
    }

    YesRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.YesId;
        else
            return HtmlConstant.YesEn;
    }

    NoRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.NoId;
        else
            return HtmlConstant.NoEn;
    }

    LanguageRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.LanguageId;
        else
            return HtmlConstant.LanguageEn;
    }

    LanguageSettingRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.LanguageSettingId;
        else
            return HtmlConstant.LanguageSettingEn;
    }

    ImageSettingRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ImageSettingId;
        else
            return HtmlConstant.ImageSettingEn;
    }

    VideoSettingRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.VideoSettingId;
        else
            return HtmlConstant.VideoSettingEn;
    }

    TabularSettingRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.TabularSettingId;
        else
            return HtmlConstant.TabularSettingEn;
    }

    SellRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SellId;
        else
            return HtmlConstant.SellEn;
    }

    BuyRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.BuyId;
        else
            return HtmlConstant.BuyEn;
    }

    DateRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.DateId;
        else
            return HtmlConstant.DateEn;
    }

    TimeRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.TimeId;
        else
            return HtmlConstant.TimeEn;
    }

    MondayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MondayId;
        else
            return HtmlConstant.MondayEn;
    }

    TuesdayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.TuesdayId;
        else
            return HtmlConstant.TuesdayEn;
    }

    WednesdayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.WednesdayId;
        else
            return HtmlConstant.WednesdayEn;
    }

    ThursdayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ThursdayId;
        else
            return HtmlConstant.ThursdayEn;
    }

    FridayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.FridayId;
        else
            return HtmlConstant.FridayEn;
    }

    SaturdayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SaturdayId;
        else
            return HtmlConstant.SaturdayEn;
    }

    SundayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SundayId;
        else
            return HtmlConstant.SundayEn;
    }
    

    JanuaryRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.JanuaryId;
        else
            return HtmlConstant.JanuaryEn;
    }

    FebruaryRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.FebruaryId;
        else
            return HtmlConstant.FebruaryEn;
    }

    MarchRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MarchId;
        else
            return HtmlConstant.MarchEn;
    }

    AprilRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.AprilId;
        else
            return HtmlConstant.AprilEn;
    }

    MayRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MayId;
        else
            return HtmlConstant.MayEn;
    }

    JuneRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.JuneId;
        else
            return HtmlConstant.JuneEn;
    }

    JulyRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.JulyId;
        else
            return HtmlConstant.JulyEn;
    }

    AugustRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.AugustId;
        else
            return HtmlConstant.AugustEn;
    }

    SeptemberRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SeptemberId;
        else
            return HtmlConstant.SeptemberEn;
    }

    OctoberRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.OctoberId;
        else
            return HtmlConstant.OctoberEn;
    }

    NovemberRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.NovemberId;
        else
            return HtmlConstant.NovemberEn;
    }

    DecemberRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.DecemberId;
        else
            return HtmlConstant.DecemberEn;
    }

    SelectedRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SelectedId;
        else
            return HtmlConstant.SelectedEn;
    }

    ChooseImageRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.ChooseImageId;
        else
            return HtmlConstant.ChooseImageEn;
    }

    MultimediaPriorityRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.MultimediaPriotiyId;
        else
            return HtmlConstant.MultimediaPriotiyEn;
    }

    SftpSettingRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.SftpSettingId;
        else
            return HtmlConstant.SftpSettingEn;
    }

    UsernameRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.UsernameId;
        else
            return HtmlConstant.UsernameEn;
    }

    PasswordRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return HtmlConstant.PasswordId;
        else
            return HtmlConstant.PasswordEn;
    }


    /*Messages Area */
    SettingSavedRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.SettingSavedId;
        else
            return MessagesConstant.SettingSavedEn;
    }

    SetMultimediaFirstRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.SetMultimediaFisrtId;
        else
            return MessagesConstant.SetMultimediaFisrtEn;
    }
    
    BackUpSuccessRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.BackUpSuccessId;
        else
            return MessagesConstant.BackUpSuccessEn;
    }

    BackUpFailedRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.BackUpFailedId;
        else
            return MessagesConstant.BackUpFailedEn;
    }

    BackUpFoundRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.BackUpFoundId;
        else
            return MessagesConstant.BackUpFoundEn;
    }

    DownloadingUpdateRes() : string
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.DownloadingUpdateId;
        else
            return MessagesConstant.DownloadingUpdateEn;
    }

    ConnectedToServerRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.ConnectedToSeverId;
        else
            return MessagesConstant.ConnectedToSeverEn;
    }
    
    FailedConnectToServerRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.FailedConnectToServerId;
        else
            return MessagesConstant.FailedConnectToServerEn;
    }
    
    RestoreDataRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.RestoreDataId;
        else
            return MessagesConstant.RestoreDataEn;
    }
    
    ConnectingRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.ConnectingId;
        else
            return MessagesConstant.ConnectingId;
    }
    
    RegisteringRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.RegisteringId;
        else
            return MessagesConstant.RegisteringEn;
    }
    
    ConnectionTimeOutRes()
    {
        if(this.languages["Language"] === Enums.Language.Indonesia)
            return MessagesConstant.ConnectionTimeOutEn;
        else
            return MessagesConstant.ConnectionTimeOutEn;
    }

}