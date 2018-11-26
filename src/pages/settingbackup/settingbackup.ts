import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Resource } from '../../helper/gen-resources';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { Helper } from '../../helper/helper';
import { LocalStorage } from '../../helper/gen-localstorage';
import { Config } from '../../helper/gen-config';
import { AppVersion } from '@ionic-native/app-version';
import { CustomToast } from '../../helper/gen-toast';
import { BackupStatusModel } from '../../models/gen-backupstatus';

/**
 * Generated class for the SettingbackupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingbackup',
  templateUrl: 'settingbackup.html',
})
export class SettingbackupPage {

  backupRes = "";
  lastBackupRes = "";
  localRes = "";
  backUpTextRes="";
  backUpSuccess = "";
  backUpFailed = "";
  //end

  languages = {};
  lastBackUpDate="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resources : Resource,
              private sqlitePorter: SQLitePorter,
              private sqlite : SQLite,
              private helper : Helper,
              private localStorage : LocalStorage,
              private config : Config,
              private appVersion : AppVersion,
              private toast : CustomToast,
              private backupStatusModel : BackupStatusModel) {
                this.htmlResources();
  }

  ionViewDidLoad() {
    this.init();
    console.log('ionViewDidLoad DemosettingbackupPage');
  }

  async init(){
    
    var backUpStatus = await this.backupStatusModel.getBackUpStatus();
    this.lastBackUpDate = backUpStatus['FormatedDate'];
  }

  async htmlResources()
  {
    this.languages = await this.resources.getLanguage();
    this.backupRes = this.resources.BackupRes();
    this.lastBackupRes = this.resources.LastBackupRes();
    this.localRes = this.resources.LocalRes();
    this.backUpTextRes = this.resources.BackUpTextRes();
    this.backUpSuccess = this.resources.BackUpSuccessRes();
    this.backUpFailed = this.resources.BackUpFailedRes();
  }

  doBackUp(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: any) => {
        let dbInstance = db._objectInstance;
        this.sqlitePorter.exportDbToSql(dbInstance)
        .then(async res => {
          var dates = this.helper.getLocalCurrentDate();
          var date = this.helper.getDateString(dates);
          var lastUpdate = await this.helper.getFromatedDateString(dates);
          //var stringifyJson = JSON.stringify(res);
          var encryptedData = await this.helper.aesEncrypt(res);
          this.localStorage.createFile("/"+ await this.appVersion.getAppName(), this.config.backUpFileName()+".crypt", encryptedData.toString())
          .then(() => {
            this.lastBackUpDate = lastUpdate;
            var data = this.backupStatusModel.createObject("", date, lastUpdate, this.config.backUpFileName()+".crypt")
            this.backupStatusModel.saveBackUpStatus(data);
            this.toast.showToast(this.backUpSuccess);
          })
          .catch(err => {
            this.toast.showToast(this.backUpFailed);
          })
        })
        .catch(err => {
          console.error(err);
        });
        // we can pass db._objectInstance as the database option in all SQLitePorter methods
      });
  }

}
