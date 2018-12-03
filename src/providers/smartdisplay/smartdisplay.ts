import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../helper/gen-config';
import 'rxjs/add/operator/map';
import * as xml2js from "xml2js";
import { Http } from '@angular/http';
import { DbServerProvider } from '../database/dbServer';
import { rejects } from 'assert';
import * as enums from "../../enum/enums";

/*
  Generated class for the SmartdisplayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmartdisplayProvider {
  public users : any;
  private apiUrl = '';


  constructor(public httpClient: HttpClient, public http : Http, private dbServerProvider : DbServerProvider) {
    console.log('Hello SmartdisplayProvider Provider');
  }

  async init(){
  }

  getXMLLocalData(urlXml : string) : Promise<any[]>{
    return new Promise(resolve => {
      console.log(urlXml);
      this.http.get(urlXml)
      .subscribe(data => {
        //let cleanedString = data.text.toString().replace("\ufeff", "");
        //console.log(data.text());
        xml2js
        .parseString(data.text(), (error, result) => {

        if(error) {
            console.error(error);
        } else {
            resolve(result);
        }

       });
      }, err => {
        console.error(err);
      });
    });
  }

  async doRegister(displayPlayerId : string, sDisplayCode : string) {
    var server = await this.dbServerProvider.getServer();
    this.apiUrl = "http://"+server["ServerIP"]+":"+server["ServerPort"]+"/";
    console.log("register", this.apiUrl);
    return new Promise((resolve, reject) => {
        this.http.get(this.apiUrl + 
                      "sdapi/SmartDisplay.bss?methodName=doGetCustomerBranchInfoByPlayerID&displayPlayerID="+displayPlayerId+
                      "&PlayerSN=Android&SDisplayCode="+sDisplayCode)
        .subscribe(data => {
            xml2js
            .parseString(data.text(), (error, result) => {

            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
          });
        }, err => {
          reject(err);
        });
    });
  }
    
  async doGetUpdatedMultimediaByPlayerID(playerId : string){
    var server = await this.dbServerProvider.getServer();
    this.apiUrl = "http://"+server["ServerIP"]+":"+server["ServerPort"]+"/";
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "sdapi/api/doGetUpdatedMultimediaByPlayerID/"+playerId)
      //this.http.get("assets/json/multimedia.json")
      .subscribe(data => {
        var dataJson = data.json();
        resolve(dataJson);
      }, err => {
          console.error(err);
        });
    });
  }

  async doGetUpdatedTickerByPlayerID(playerId : string){
    var server = await this.dbServerProvider.getServer();
    this.apiUrl = "http://"+server["ServerIP"]+":"+server["ServerPort"]+"/";
    return new Promise(resolve => {
      this.http.get(this.apiUrl + "sdapi/SmartDisplay.bss?methodName=doGetUpdatedTickerByPlayerID&displayPlayerID="+playerId)
      .subscribe(data => {
        xml2js
        .parseString(data.text(), (error, result) => {

        if(error) {
            console.error(error);
        } else {
            resolve(result);
        }

      });
      }, err => {
        console.error(err);
      });
    });
  }

  async doGetTickerSettingByPlayerId(playerId : string){
    var server = await this.dbServerProvider.getServer();
    this.apiUrl = "http://"+server["ServerIP"]+":"+server["ServerPort"]+"/";
    return new Promise(resolve => {
      this.http.get(this.apiUrl + "sdapi/SmartDisplay.bss?methodName=doGetUpdatedTickerSettingsByPlayerID&displayPlayerID="+playerId)
      .subscribe(data => {
        xml2js
        .parseString(data.text(), (error, result) => {

        if(error) {
            console.error(error);
        } else {
            resolve(result);
        }

      });
      }, err => {
        console.error(err);
      });
    });
  }

  async doGetLastUpdateContentByPlayerID(type , playerId, id){
    var server = await this.dbServerProvider.getServer();
    this.apiUrl = "http://"+server["ServerIP"]+":"+server["ServerPort"]+"/";
    var stringType = "";
    if(type == enums.ContentType.MULTIMEDIA_SD)
      stringType = "MULTIMEDIA_SD";
    else
      stringType = "TICKER_SD";

    return new Promise(resolve => {
      this.http.get(this.apiUrl + "sdapi/SmartDisplay.bss?methodName=doGetLastUpdateContentByPlayerID&displayPlayerID="+playerId+"&moduleName="+stringType+"&contentID="+id)
      .subscribe(data => {
        xml2js
        .parseString(data.text(), (error, result) => {

        if(error) {
            console.error(error);
        } else {
            resolve(result);
        }

      });
      }, err => {
        console.error(err);
      });
    });

  }
}


