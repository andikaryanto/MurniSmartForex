import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Item, Header  } from 'ionic-angular';
import { Config } from '../../helper/gen-config';
import 'rxjs/add/operator/map';

/*
  Generated class for the MUserprofileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MUserprofileProvider {

  public userProfile : any;
  apiUrl = '';
  constructor(public httpClient: HttpClient, public http : Http, config : Config) {
    console.log('Hello MUserprofileProvider Provider');
    this.apiUrl = config.getApiServer();
  }

  getUserProfile(userprofilid : number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiUrl+'/api/MUserProfile/' + userprofilid).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
        console.error(err)
        //console.log(err);
      });
    });
  }

  addUserProfile(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.apiUrl+'/api/MUserProfile', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.error('API Error : ', JSON.stringify(data));
          reject(err);
        }, );
    });
  }

}
