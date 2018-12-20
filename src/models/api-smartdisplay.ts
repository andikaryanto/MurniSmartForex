import { SmartdisplayProvider }  from '../providers/smartdisplay/smartdisplay';
import { Injectable } from '@angular/core';
import { SmartDisplayCustomerInfoModel } from './gen-smartdisplaycustomerinfo';
import { SmartDisplayPlayerConfigurationModel } from './gen-smartdisplayplayercofiguration';
import { SmartDisplayContainSettingModel } from './gen-smartdisplaycontainsetting';
import { SmartDisplayParameterSettingModel } from './gen-smartdisplayparametersetting';
import { DbMultimediaProvider } from '../providers/database/dbMultimedia';
import { MultimediaModel } from './gen-multimedia';
import { LocalStorage } from '../helper/gen-localstorage';
import { File } from '@ionic-native/file';
import * as Enums from '../enum/enums';
import { callbackify } from 'util';
import { ServerModel } from './gen-server';
import { CustomToast } from '../helper/gen-toast';
import { Resource } from '../helper/gen-resources';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { SmartDisplayTickerSettingsModel } from './gen-smartdisplaytickersetting';
import { TickerModel } from './gen-ticker';
import { resolve } from 'dns';

@Injectable()

export class ApiSmartDisplayModel
{
    /* HTML and message resource*/
    private connectedToServerRes = "";
    private failedToConnectedToServerRes = ""
    private connectionTimeOutRes = ""

    constructor(private apiSmartDisplayProvider : SmartdisplayProvider,
                private smartDisplayCustomerInfoModel : SmartDisplayCustomerInfoModel,
                private smartDisplayPlayerConfigurationModel : SmartDisplayPlayerConfigurationModel,
                private smartDisplayContainSettingModel : SmartDisplayContainSettingModel,
                private smartDisplayParameterSettingModel : SmartDisplayParameterSettingModel,
                private smartDisplayTickerSettingModel : SmartDisplayTickerSettingsModel,
                private multimediModel : MultimediaModel,
                private serverModel : ServerModel,
                private localStorage : LocalStorage,
                private toast : CustomToast,
                private resources : Resource,
                private tickerModel : TickerModel)
    {
        this.init();
    }
    
    async init(){
        await this.htmlResources();
    }

    async htmlResources()
    {
        await this.resources.getLanguage();
        this.connectedToServerRes = this.resources.ConnectedToServerRes();
        this.failedToConnectedToServerRes = this.resources.FailedConnectToServerRes();
        this.connectionTimeOutRes = this.resources.ConnectionTimeOutRes();
    }
    saveSmartDisplayConfig(displayPlayerId, sDisplayCode) : Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            this.apiSmartDisplayProvider.doRegister(displayPlayerId,sDisplayCode)
            .then(data => {
                var sResultCode = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SResultCode'];
                if(sResultCode == "SUCCESS"){
                    var cutomerInfo = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayCustomerInfo'][0];
                    var playerConfiguration = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayPlayerConfiguration'][0];
                    var containSetting = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayContainSetting'][0];
                    var parameterSetting = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayParameterSetting'][0];
                    this.smartDisplayCustomerInfoModel.saveSmartDisplayCustomerInfo(cutomerInfo);
                    this.smartDisplayPlayerConfigurationModel.saveSmartDisplayPlayerConfiguration(playerConfiguration);
                    this.smartDisplayContainSettingModel.saveSmartDisplayContainSetting(containSetting);
                    this.smartDisplayParameterSettingModel.saveSmartDisplayParameterSetting(parameterSetting);
                    
                    this.toast.showToast(this.connectedToServerRes);
                    resolve(true);
                }
                else if (sResultCode == "FAILED"){
                    this.toast.showToast(data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SResultDescription']);
                    resolve(false);
                }
                else
                {
                    this.toast.showToast("Unknown");
                    resolve(false);
                }
            })
            .catch(err => {
                if(err.status == 0)
                    this.toast.showToast(this.connectionTimeOutRes);
                resolve(false);
            });
        });
    }



    async doGetUpdatedMultimediaByPlayerID(playerId : string){
        var dataMultimedia = await this.apiSmartDisplayProvider.doGetUpdatedMultimediaByPlayerID(playerId);
        return dataMultimedia;
    }

    // async doGetTickerSettingByPlayerId(playerId : string){
    //     var isAnyChange = false;
    //     var updatesourcedatalocal ={};
    //     var dataTickerSetting = await this.apiSmartDisplayProvider.doGetTickerSettingByPlayerId(playerId);
    //     //console.log('here',dataTickerSetting['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayTickerSettings'][0]['TickerSettingsInfo']);
    //     var sourcedata = dataTickerSetting['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayTickerSettings'][0]['TickerSettingsInfo']
    //     //console.log('here : ',sourcedata[0]['Value'][0]);
    //     var sourcedatalocal = await this.smartDisplayTickerSettingProvider.getSmartDisplayTickerSettings();
    //     var TickerSetting= this.smartDisplayTickerSettingModel.createObjectSmartDisplayTickerSettings(
    //         null,
    //         sourcedata[0]['Value'][0],
    //         sourcedata[1]['Value'][0],
    //         sourcedata[2]['Value'][0],
    //         sourcedata[3]['Value'][0],
    //         sourcedata[4]['Value'][0],
    //         sourcedata[5]['Value'][0],
    //         sourcedata[6]['Value'][0],
    //         sourcedata[7]['Value'][0],
    //         sourcedata[8]['Value'][0],
    //         sourcedata[9]['Value'][0],
    //         sourcedata[10]['Value'][0],
    //         sourcedata[11]['Value'][0],
    //         sourcedata[12]['Value'][0],
    //         sourcedata[13]['Value'][0],
    //         sourcedata[14]['Value'][0],
    //     )  

    //     if(sourcedatalocal['Id'] != undefined )
    //     {
    //         if ((sourcedata[0]['Value'][0]!=sourcedatalocal['FontName']) || (sourcedata[1]['Value'][0]!= sourcedatalocal['FontSize']) ||
    //         (sourcedata[2]['Value'][0]!= sourcedatalocal['FontColour']) || (sourcedata[3]['Value'][0]!=sourcedatalocal['BGColour']) ||
    //         (sourcedata[4]['Value'][0]!= sourcedatalocal['Separator']) || (sourcedata[5]['Value'][0]!= sourcedatalocal['Separator_ImageFilePath']) || 
    //         (sourcedata[6]['Value'][0]!= sourcedatalocal['Separator_Line']) || (sourcedata[7]['Value'][0]!= sourcedatalocal['Separator_LineColour']) ||
    //         (sourcedata[8]['Value'][0]!= sourcedatalocal['Separator_LineThickness']) || (sourcedata[9]['Value'][0]!= sourcedatalocal['Separator_SymbolFilePath']) ||
    //         (sourcedata[10]['Value'][0]!= sourcedatalocal['Separator_SymbolColour']) || (sourcedata[11]['Value'][0]!= sourcedatalocal['Delay']) ||
    //         (sourcedata[12]['Value'][0]!= sourcedatalocal['Step']) || (sourcedata[13]['Value'][0]!= sourcedatalocal['DelayPotrait']) ||
    //         (sourcedata[14]['Value'][0]!= sourcedatalocal['StepPotrait']))
    //         {
    //             this.smartDisplayTickerSettingProvider.updateSmartDisplayTickerSettings(sourcedatalocal['Id'],
    //                                                                                     sourcedata[0]['Value'][0],
    //                                                                                     sourcedata[1]['Value'][0],
    //                                                                                     sourcedata[2]['Value'][0],
    //                                                                                     sourcedata[3]['Value'][0],
    //                                                                                     sourcedata[4]['Value'][0],
    //                                                                                     sourcedata[5]['Value'][0],
    //                                                                                     sourcedata[6]['Value'][0],
    //                                                                                     sourcedata[7]['Value'][0],
    //                                                                                     sourcedata[8]['Value'][0],
    //                                                                                     sourcedata[9]['Value'][0],
    //                                                                                     sourcedata[10]['Value'][0],
    //                                                                                     sourcedata[11]['Value'][0],
    //                                                                                     sourcedata[12]['Value'][0],
    //                                                                                     sourcedata[13]['Value'][0],
    //                                                                                     sourcedata[14]['Value'][0],
    //             )
    //            isAnyChange = true;
    //         }
    //         else
    //         {
    //             isAnyChange= false;
    //         }
    //     }
    //     else
    //     {
    //         this.smartDisplayTickerSettingModel.saveSmartDisplayTickerSettings(TickerSetting);
    //         isAnyChange = true;
    //     }
        
    //     if(isAnyChange)
    //     {
    //         updatesourcedatalocal = await this.smartDisplayTickerSettingProvider.getSmartDisplayTickerSettings();
    //     }
        
    //     console.log('data ticker',sourcedatalocal);
    //     return updatesourcedatalocal;
    // }

    async doGetTickerSettingByPlayerId(playerId : string){

            var dataTickerSetting = await this.apiSmartDisplayProvider.doGetTickerSettingByPlayerId(playerId);
            var sourcedata = dataTickerSetting['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayTickerSettings'][0]['TickerSettingsInfo'];
            var TickerSetting= this.smartDisplayTickerSettingModel.createObjectSmartDisplayTickerSettings(
                        null,
                        sourcedata[0]['Value'][0],
                        sourcedata[1]['Value'][0],
                        sourcedata[2]['Value'][0],
                        sourcedata[3]['Value'][0],
                        sourcedata[4]['Value'][0],
                        sourcedata[5]['Value'][0],
                        sourcedata[6]['Value'][0],
                        sourcedata[7]['Value'][0],
                        sourcedata[8]['Value'][0],
                        sourcedata[9]['Value'][0],
                        sourcedata[10]['Value'][0],
                        sourcedata[11]['Value'][0],
                        sourcedata[11]['Value'][0],
                        sourcedata[12]['Value'][0],
                        sourcedata[13]['Value'][0],
                        sourcedata[13]['Value'][0],
                        sourcedata[14]['Value'][0],
                    )  
            this.smartDisplayTickerSettingModel.saveSmartDisplayTickerSettings(TickerSetting);
    }

    async isRecordFound(playerId : string){
        var isFound = false;
        var dataMultimedia = await this.doGetUpdatedMultimediaByPlayerID(playerId);
        if(dataMultimedia['result'] = "SUCCESS"){
            isFound = true;
        }
        return isFound;
    }
    
    saveData(sourceData, playerId = null){
        return new Promise(async (resolve, reject) => {
            var data = await this.multimediModel.getDataByMultimediaId(sourceData['id']);
                var isValid = false;
                var isAnyChange = false;
                if(data['Id'] != undefined){
                    if(sourceData['fileName'] != data['FileName']
                    || sourceData['fileMusic'] != data['FileMusic'] 
                    || sourceData['multimediaType'] != data['MultimediaType']
                    || sourceData['duration'] != data['Duration']
                    || sourceData['activationDate'] != data['ActivationDate'] 
                    || sourceData['deactivationDate'] != data['DeactivationDate'] 
                    || sourceData['deliveryDate'] != data['DeliveryDate']  
                    || sourceData['path'] != data['Path']  
                    || sourceData['isDeleted'] != data['IsDeleted']  
                    || sourceData['startTime'] != data['StartTime']  
                    || sourceData['endTime'] != data['EndTime'] 
                    || sourceData['days'] != data['Days']){
                        isValid = true;
                        isAnyChange = true;
                    } else {

                        this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.MULTIMEDIA_SD, playerId, sourceData['id'])
                        .then(res => {
                        })
                        .catch(err => {
                        });
                    }
                }
                else{
                    isValid = true;
                }
        
                if(isValid){
                    var localPath = "";
                    var originPath = sourceData['path'];;
                    var localDir = ""
                    if (sourceData['multimediaType'] == Enums.ApiSmartDisplayMultimediaType.StillImage.toString()){
                        //originPath = sourceData['path'];//"/MDisplay/Stills/" + sourceData['fileName'];
                        localDir = this.localStorage.getApplicationDataImageDirectory();
                        localPath = this.localStorage.getApplicationDataImageDirectory() +"/"+ sourceData['fileName'];
                    }
                    else if (sourceData['multimediaType'] == Enums.ApiSmartDisplayMultimediaType.VCD.toString()){
                        //originPath = sourceData['path'];//"/MDisplay/Videos/" + sourceData['fileName'];
                        localDir = this.localStorage.getApplicationDataVideoDirectory();
                        localPath = this.localStorage.getApplicationDataVideoDirectory() +"/"+ sourceData['fileName'];
        
                    }
                    var object = this.multimediModel.createObject(null, sourceData['id'], sourceData['code'], sourceData['name'], sourceData['fileName'], sourceData['fileMusic'], sourceData['multimediaType'],
                                sourceData['duration'], sourceData['active'], sourceData['activationDate'], sourceData['deactivationDate'], sourceData['deliveryDate'],sourceData['fileSize'],
                                sourceData['checksum'], sourceData['path'], sourceData['isDeleted'], sourceData['priority'], sourceData['startTime'],
                                sourceData['endTime'], sourceData['days'], localPath);
        
                    if(data['Id'] != undefined){
                        object['Id'] = data['Id']; 
                        if(isAnyChange){
                            if(sourceData['isDeleted'] == "F"){
                                if(sourceData['fileName'] != data['FileName']){
                                    this.localStorage.downloadFromFTP(localPath,  originPath)
                                    .then(async isDownloaded => {
                                        if(isDownloaded){
                                            this.multimediModel.updateData(object)
                                                .then(() => {
                                                    //console.log(object);
                                                    this.localStorage.removeData(this.localStorage.getApplicationDataImageDirectory(), data['FileName'])
                                                    .then(isDeleted => {
                                                        if(isDeleted){
                                                            //this.multimediModel.deleteMultimedia(data['Id']);
                                                            resolve(object);  
                                                        } 
                                                    })
                                                    .catch(err => {
                                                        reject(err);
                                                    });

                                                    this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.MULTIMEDIA_SD, playerId, object['MultimediaId'])
                                                    .then(res => {
                                                    })
                                                    .catch(err => {
                                                    });
                                                    resolve(object);                  
                                                })
                                                .catch(err => {
                                                    //console.error(err);
                                                    reject(err);
                                                });
                                            }
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                                } else {
                                    this.localStorage.isMultimediaExist(localPath, sourceData['fileName'])
                                    .then(isExist => {
                                        if(!isExist){
                                            this.localStorage.downloadFromFTP(localPath,  originPath)
                                            .then(async isDownloaded => { 
                                                
                                                if(isDownloaded){
                                                    this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.MULTIMEDIA_SD, playerId, object['MultimediaId'])
                                                    .then(res => {
                                                    })
                                                    .catch(err => {
                                                    });
                                                }
                                                resolve(object);  
                                            })
                                            .catch(err => {
                                                reject(err);
                                            });
                                        }
                                    });
                                    
                                    this.multimediModel.updateData(object)
                                    .then(() => {
                                        //console.log(object);
                                        resolve(object);                            
                                    })
                                    .catch(err => {
                                        //console.error(err);
                                        reject(err);
                                    });
                                }
                            } else {
                                this.localStorage.removeData(localDir, data['FileName'])
                                .then(isDeleted => {
                                    if(isDeleted){
                                        this.multimediModel.deleteMultimedia(data['MultimediaId'])
                                        .then(isDeleted => {
                                            resolve(object); 
                                        })
                                        .catch(err => {
                                            reject(err);
                                            console.error(err);
                                        });   
                                    }
                                })
                                .catch(err => {
                                    reject(err);
                                })   
                                resolve(object);   
                            }
                        } else {
                            this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.MULTIMEDIA_SD, playerId, object['MultimediaId'])
                            .then(res => {
                            })
                            .catch(err => {
                            });
                            resolve(object);
                        }
                    } else {
                        if(localPath != "" && sourceData["isDeleted"] == "F")
                        {
                            console.log(localDir + sourceData['fileName']);
                            this.localStorage.downloadFromFTP(localPath,  originPath)
                            .then( isDownloaded => {
                                if(isDownloaded){
                                    this.multimediModel.saveData(object)
                                    .then(() => {
                                        this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.MULTIMEDIA_SD, playerId, object['MultimediaId'])
                                        .then(res => {
                                        })
                                        .catch(err => {
                                        });
                                        resolve(object);                            
                                    })
                                    .catch(err => {
                                        //console.error(err);
                                        reject(err);
                                    });
                                }
                            })
                            .catch(err => {
                                reject(err);
                            });
                        }
                    }
                }
        });
        
    }

    async doGetUpdatedTickerByPlayerID(playerid){
        //var returnData = {};
        return new Promise((resolve, reject) => {
            this.apiSmartDisplayProvider.doGetUpdatedTickerByPlayerID(playerid)
            .then(async data => {
                if(data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SResultCode'] == "SUCCESS" 
                && data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayPlayer'][0]['LastUpdate'][0] != "null"){
                    var objectData = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayTicker'][0]['TickerInfo'];
                    //await this.tickerModel.saveOrUpdateBatch(objectData);
                    //for (var i = 0 ; i< data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayTicker'][0]['TickerInfo'].length ; i++){
                    
                    var objectData = data['SmartDisplayAPI']['SmartDisplayAPIResult'][0]['SmartDisplayTicker'][0]['TickerInfo'][0];
                    this.tickerModel.getDataByTickerId(objectData['ID'])
                    .then(existedTicker => {
                        var newData = this.tickerModel.createObject(null, objectData['ID'], objectData['Name'], objectData['Text'], objectData['Priority']
                                        , objectData['Active'], objectData['ActivationDate'], objectData['DeactivationDate'], objectData['IsDelete']);
                        if(existedTicker['Id'] != undefined){
                            newData['Id'] = existedTicker['Id'];
                            this.tickerModel.updateData(newData)
                            .then(isUpdated => {
                                if(isUpdated){
                                    // if(newData['IsDelete'] == "T"){
                                    //     this.smartDisplayTickerSettingModel.getSmartDisplayTickerSettings()
                                    //     .then(tickerSetting => {
                                    //         this.smartDisplayTickerSettingModel.updateSmartDisplayTickerSettingsColumn("UsableDelay", tickerSetting["UsableDelay"] - tickerSetting["Delay"]);
                                    //         this.smartDisplayTickerSettingModel.updateSmartDisplayTickerSettingsColumn("UsableDelayPotrait", tickerSetting["UsableDelayPotrait"] - tickerSetting["DelayPotrait"]);
                                    //     })
                                    //     .catch(err => {
                                    //         console.log(err);
                                    //     })
                                    // }
                                    this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.TIKCER_SD, playerid, objectData['ID'])
                                    .then(res => {
                                    })
                                    .catch(err => {
                                    });
                                }
                            })
                            .catch(err => {
                            });   
                        } else {
                            this.tickerModel.saveData(newData)
                            .then(isInserted => {
                                if(isInserted){
                                    // if(newData['IsDelete'] == "F"){
                                    //     this.smartDisplayTickerSettingModel.getSmartDisplayTickerSettings()
                                    //     .then(tickerSetting => {
                                    //         this.smartDisplayTickerSettingModel.updateSmartDisplayTickerSettingsColumn("UsableDelay", tickerSetting["Delay"] + tickerSetting["UsableDelay"]);
                                    //         this.smartDisplayTickerSettingModel.updateSmartDisplayTickerSettingsColumn("UsableDelayPotrait", tickerSetting["DelayPotrait"] + tickerSetting["UsableDelayPotrait"]);
                                    //     })
                                    //     .catch(err => {
                                    //         console.log(err);
                                    //     })
                                    // }
                                    this.apiSmartDisplayProvider.doGetLastUpdateContentByPlayerID(Enums.ContentType.TIKCER_SD, playerid, objectData['ID'])
                                    .then(res => {
                                    })
                                    .catch(err => {
                                   });
                                }
                            })
                            .catch(err => {
                            });   
                        }
                    })
                    .catch(err => {
                    });
                    resolve(true);
                } else {
                    
                    resolve(false);
                }
                //returnData = await this.tickerModel.getData();
            })
            .catch(async err => {
                resolve(false);
            });
        });
    }

    reDownloadMultimedia(path,name,type,originPath)
    {
        console.log("reDownload");
        var localPath="";
        //var originPath="";
        if(type===Enums.ApiSmartDisplayMultimediaType.VCD)
        {   
            //originPath="/MDisplay/Videos/" + name;
            localPath = this.localStorage.getApplicationDataVideoDirectory()+"/"+name;
        }
        else
        {
            //originPath= "/MDisplay/Stills/" + name;
            localPath = this.localStorage.getApplicationDataImageDirectory()+"/"+name;
        }
        
        this.localStorage.removeData(path,name)
        .then(() => {
            console.log("Delete data Succes");
            this.localStorage.downloadFromFTP(localPath,originPath)
            .then(async isDownloaded => { 

            })
            .catch(err => {
                //reject(err);
            }); 
        })
        .catch((err)=>console.log(err));
    }
}