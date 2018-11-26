import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Item, Header  } from 'ionic-angular';
import { Config } from '../../helper/gen-config';
import 'rxjs/add/operator/map';

/*
  Generated class for the TKejadianProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TKejadianProvider {
  apiUrl = '';//'http://WIN-S7KJG96SGAH:8080';// My Own VM server
  constructor(public httpClient: HttpClient, public http : Http, config : Config) {
    console.log('Hello TKejadianProvider Provider');
    this.apiUrl = config.getApiServer();
  }

  getKejadian() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiUrl+'/api/Tkejadian').subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
        console.log(err);
      });
    });
  }

}
