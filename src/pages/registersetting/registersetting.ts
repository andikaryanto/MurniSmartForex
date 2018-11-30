import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Resource } from '../../helper/gen-resources';
import { SFTPWrapper } from 'ssh2';
import { SftpModel } from '../../models/gen-sftp';
import { CustomToast } from '../../helper/gen-toast';
import { RegisterPage } from '../register/register';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

/**
 * Generated class for the RegistersettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersetting',
  templateUrl: 'registersetting.html',
})
export class RegistersettingPage{

  /*html res*/
  dataSavedRes = "";
  usernameRes = "";
  passwordRes = "";
  /*end html res*/
  
  appName = "";
  SftpModels = {};


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private appVersion : AppVersion,
              private resources : Resource,
              private sftpModel : SftpModel,
              private customToast : CustomToast,
              private menuCtrl : MenuController
              ) {
              this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersettingPage');
  }

  async init(){
    this.menuCtrl.enable(false, "sideMenu");
    await this.htmlResources();
    this.appName = await this.appVersion.getAppName();
    this.SftpModels = await this.sftpModel.getSftp();
    console.log(this.SftpModels);
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.dataSavedRes = this.resources.SettingSavedRes();
    this.usernameRes = this.resources.UsernameRes();
    this.passwordRes = this.resources.PasswordRes();
  }

  save(){
    var newData = this.sftpModel.createObject(null, this.SftpModels['Username'], this.SftpModels['Password']);
    this.sftpModel.saveSftp(newData)
    .then(_ => {
      this.customToast.showToast(this.dataSavedRes);
      this.navCtrl.popTo(RegisterPage);
    })
    .catch(err => {
      console.error("err", err);
    });
  }

}
