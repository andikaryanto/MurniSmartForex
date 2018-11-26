import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Resource } from "./gen-resources";
import { ServerModel } from "../models/gen-server";

@Injectable()
export class Config
{
    server = {};
    constructor(private resource : Resource, private platform : Platform, private serverModel : ServerModel)
    {

    }

    async getServer(){
        this.server = await this.serverModel.getServer();
    }

    getApiServer() : string
    {
        //return 'http://192.168.43.142:8888';
        return 'http://WIN-S7KJG96SGAH:8080';
    }

    
    async getSmartDisplayApiServer() : Promise<string>
    {
        //return 'http://192.168.43.142:8888';
        return "http://"+this.server['ServerIP']+":"+this.server['ServerPort'];
        //eturn 'http://192.168.1.122:8080/';
    }

    createdTempDir() : string
    {
        return "storedPicturesThumbnail";
    }

    videoDir() : string
    {
        return "SmartVideos";
    }
    
    imageDir() : string
    {
        return "SmartImages";
    }

    videoAssets() : string
    {
        return "videos";
    }

    backUpFileName() : string{
        return "dtStore";
    }

    imageAssets() : string
    {
        return "photos";
    }

    chaceGalleryKey()
    {
        return "ImageGallery";
    }
    
    chaceScreenResolution()
    {
        return "ScreenResolution";
    }

    getPlatformFileSystem(platform : Platform) : string
    {
        var platformFilseSytem = "";
        if(platform.is('ios'))
        {
            platformFilseSytem = "not Know yet";
        }
        else if(platform.is('android'))
        {
            platformFilseSytem = "file://";
        }
        return platformFilseSytem;
    }

    async getDay(day : number) 
    {
        await this.resource.getLanguage();
        var dayString = "";
        if(day === 1)
            dayString = this.resource.MondayRes();
        else if(day === 2)
            dayString = this.resource.TuesdayRes();
        else if(day === 3)
            dayString = this.resource.WednesdayRes();
        else if(day === 4)
            dayString = this.resource.ThursdayRes();
        else if(day === 5)
            dayString = this.resource.FridayRes();
        else if(day === 6)
            dayString = this.resource.SaturdayRes();
        else if(day === 7)
            dayString = this.resource.SundayRes();

        return dayString
    }

    
    async getMonth(month : number)
    {
        await this.resource.getLanguage();
        var monthString = "";
        if(month === 1)
            monthString = this.resource.JanuaryRes();
        else if(month === 2)
            monthString = this.resource.FebruaryRes();
        else if(month === 3)
            monthString = this.resource.MarchRes();
        else if(month === 4)
            monthString = this.resource.AprilRes();
        else if(month === 5)
            monthString = this.resource.MayRes();
        else if(month === 6)
            monthString = this.resource.JuneRes();
        else if(month === 7)
            monthString = this.resource.JulyRes();
        else if(month === 8)
            monthString = this.resource.AugustRes();
        else if(month === 9)
            monthString = this.resource.SeptemberRes();
        else if(month === 10)
            monthString = this.resource.OctoberRes();
        else if(month === 11)
            monthString = this.resource.NovemberRes();
        else if(month === 12)
            monthString = this.resource.DecemberRes();
        return monthString
    }

    getScreenResolution() //: Promise<any[]>
    {
        var Screen : Array<{width : number, height : number}>
        Screen = [{width : window.outerWidth, height : window.outerHeight}];

        return new Promise((resolve, reject) =>
            {
                resolve(Screen);
            }
        )

        //return Screen;
    }

    getFTPAccount(){
        var object = {
            "Host" : "192.168.1.122",
            "Port" : "22",
            "User" : "Administrator",
            "Password" : "p@ssw0rd"
        }
        return object;
    }
}