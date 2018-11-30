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
                private multimediModel : MultimediaModel,
                private serverModel : ServerModel,
                private localStorage : LocalStorage,
                private toast : CustomToast,
                private resources : Resource)
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

    async isRecordFound(playerId : string){
        var isFound = false;
        var dataMultimedia = await this.doGetUpdatedMultimediaByPlayerID(playerId);
        if(dataMultimedia['result'] = "SUCCESS"){
            isFound = true;
        }
        return isFound;
    }
    
    saveData(sourceData){
        return new Promise(async (resolve, reject) => {
            this.multimediModel.getDataByMultimediaId(sourceData['id'])
            .then( data => {
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
                                        this.multimediModel.updateData(object)
                                            .then(() => {
                                                //console.log(object);
                                                this.localStorage.removeData(this.localStorage.getApplicationDataImageDirectory(), data['FileName'])
                                                .then(isDeleted => {
                                                    //this.multimediModel.deleteMultimedia(data['Id']);
                                                    resolve(object);    
                                                })
                                                .catch(err => {
                                                    reject(err);
                                                })                    
                                            })
                                            .catch(err => {
                                                //console.error(err);
                                                reject(err);
                                            });
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
                            resolve(object);
                        }
                    } else {
                        if(localPath != "" && sourceData["isDeleted"] == "F")
                        {
                            console.log(localDir + sourceData['fileName']);
                            this.localStorage.downloadFromFTP(localPath,  originPath)
                            .then( isDownloaded => {
                                this.multimediModel.saveData(object)
                                .then(() => {
                                    resolve(object);                            
                                })
                                .catch(err => {
                                    //console.error(err);
                                    reject(err);
                                });
                            })
                            .catch(err => {
                                reject(err);
                            });
                        }
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
        });
        
    }

    async doGetUpdatedTickerByPlayerID(playerid){
        var data = await this.apiSmartDisplayProvider.doGetUpdatedTickerByPlayerID(playerid);
        return data['SmartDisplayAPI']['SmartDisplayAPIResult'][0];
    }

    reDownloadMultimedia(path,name,type,originPath)
    {
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