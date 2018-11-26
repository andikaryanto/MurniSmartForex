import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the HomeMapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeMapProvider {

  apiUrl = 'http://WIN-S7KJG96SGAH:8080';

  constructor(public httpClient: HttpClient) {
    console.log('Hello HomeMapProvider Provider');
  }

  getAllKejadian()
  {
    return new Promise(resolve => {
      this.httpClient.get(this.apiUrl+'/api/TKejadian')
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
