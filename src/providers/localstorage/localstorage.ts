import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as xml2js from "xml2js";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/* wkwkwk,, its the first time use rest in ionic,, just tried */
@Injectable()
export class LocalStorageProvider {


  constructor(public httpClient: HttpClient, private http : Http) {
    console.log('Hello RestProvider Provider');
  }



  getXMLLocalData(urlXml : string) : Promise<any[]>{
    return new Promise(resolve => {
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

}
