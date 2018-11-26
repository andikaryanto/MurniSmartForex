import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../helper/gen-config';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  loginUser : any;

  apiUrl = '';
 
  constructor( public httpClient : HttpClient, public http : Http, config : Config) {
    console.log('Hello LoginProvider Provider');
    this.apiUrl = config.getApiServer();
  }

  doLogin(userName : string, password : string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiUrl+'/api/MUser?username='+userName+'&password='+password)
      //.map(data => data.json().result)
      .subscribe(data => {  
       resolve(data);
      //this.loginUser = data.filter(item => item.UserName == userName && item.Password == password);
      }, err => {
        reject(err);
      });
    });
  }

  doLogin1() {
    return new Promise(resolve => {
      this.httpClient.get(this.apiUrl+'/api/MUser')
      //.map(data => data.json().result)
      .subscribe(data => {
        resolve(data);
      //this.loginUser = data.filter(item => item.UserName == userName && item.Password == password);
      }, err => {
        console.log(err);
      });
    });
  }

}
