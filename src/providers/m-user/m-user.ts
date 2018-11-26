import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Item, Header  } from 'ionic-angular';
import { Config } from '../../helper/gen-config';
import 'rxjs/add/operator/map';

/*
  Generated class for the MUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MUserProvider {

  public users : any;
  apiUrl = '';

  constructor(public httpClient: HttpClient, public http : Http, config : Config) {
    console.log('Hello RestProvider Provider');
    this.apiUrl = config.getApiServer();
  }

  getUsers() {
    return new Promise(resolve => {
      this.httpClient.get(this.apiUrl+'/api/MUser')
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //undone method, still exploring
  // getUser(userName : string, ) {
  //   //return new Promise(resolve => {
  //     this.http2.get(this.apiUrl+'/api/MUser')
  //     .map(data => data.json().results)
  //     .subscribe(data => {
  //       this.users = data.filter(item => item.UserName == userName);
  //     }, err => {
  //       console.log(err);
  //     });
  //   //});
  // }

  addUser(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.apiUrl+'/api/MUser', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          
          console.error('API Error : ', JSON.stringify(data));
          reject(err);
        });
    });
  }

}
