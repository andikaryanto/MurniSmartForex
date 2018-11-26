import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SftpModel } from '../../models/gen-sftp';
import { Resource } from '../../helper/gen-resources';
import { CustomToast } from '../../helper/gen-toast';

/**
 * Generated class for the SftpsettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sftpsetting',
  templateUrl: 'sftpsetting.html',
})
export class SftpsettingPage {
  //HTML Resource
  sftpSettingRes = "";
  usernameRes = "";
  passwordRes = "";
  dataSavedRes = "";
  // End

  sftpModels = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sftpModel : SftpModel,
              private resources : Resource,
              private customToast : CustomToast) {
                this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SftpsettingPage');
  }

  async init(){
    await this.htmlResources();
    this.sftpModels = await this.sftpModel.getSftp();
    console.log(this.sftpModels);
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.sftpSettingRes = this.resources.SftpSettingRes();
    this.usernameRes = this.resources.UsernameRes();
    this.passwordRes = this.resources.PasswordRes();
    this.dataSavedRes = this.resources.SettingSavedRes();
  }

  async save(){
    var newData = this.sftpModel.createObject(null, this.sftpModels['Username'], this.sftpModels['Password'])
    await this.sftpModel.saveSftp(newData);
    this.customToast.showToast(this.dataSavedRes);
    this.navCtrl.pop();
  }

}
