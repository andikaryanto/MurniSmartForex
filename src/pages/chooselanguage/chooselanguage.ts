import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LanguageModel } from '../../models/gen-language';
import { Pages } from '../../helper/gen-pages';
import { RegisterPage } from '../register/register';
import { RestoreStatusModel } from '../../models/gen-restorestatus';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LocalStorage } from '../../helper/gen-localstorage';
import { AppVersion } from '@ionic-native/app-version';
import { Config } from '../../helper/gen-config';
import { Helper } from '../../helper/helper';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Resource } from '../../helper/gen-resources';
import { DisplayimagevideoPage } from '../displayimagevideo/displayimagevideo';
/**
 * Generated class for the ChooselanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chooselanguage',
  templateUrl: 'chooselanguage.html',
})
export class ChooselanguagePage {
  ///html resource/
  restoringRes = "";

  backgrounds = [
    'assets/background/background-1.jpg',
    'assets/background/background-2.jpg',
    'assets/background/background-3.jpg',
    'assets/background/background-4.jpg',
    'assets/background/background-7.jpeg' 
  ];

  backUpFoundRes= "";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private languageModel : LanguageModel,
              private page : Pages,
              private restoreStatusModel : RestoreStatusModel,
              private sqlite : SQLite,
              private localStorage : LocalStorage,
              private appVersion : AppVersion,
              private config : Config,
              private helper : Helper,
              private sqlitePorter : SQLitePorter,
              private loadingCtrl : LoadingController,
              private resources : Resource,
              private alertCtrl : AlertController) {
                this.init();
                
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad ChooselanguagePage');
    //this.page.statBar();
  }

  

  promptRestoreData(){
    let alert = this.alertCtrl.create({
      title: "Restore",
      message: this.backUpFoundRes,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
            this.doRestore();
          }
        }
      ]
    });
    alert.present();
    
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.backUpFoundRes = this.resources.BackUpFoundRes();
    this.restoringRes = this.resources.RestoreDataRes();
  }

  async init(){
    await this.htmlResources();
    this.appVersion.getAppName()
    .then(async value => {
      this.localStorage.isBackFileExist(value, this.config.backUpFileName()+".crypt")
      .then(res => {
        if(res){
          this.promptRestoreData();
        }
      })
      .catch(err => {
        console.error(err);
      });
    })
  }


  async save(language : string)
  {
    this.languageModel.updatelanguageColumn("Language", language);
    this.navCtrl.setRoot(RegisterPage);
  }

  async doRestore(){
    var restoreStatus = await this.restoreStatusModel.getRestoreStatus();
    console.log(restoreStatus["FileName"])
    if(restoreStatus["FileName"] === undefined || restoreStatus["FileName"] === null){
      this.appVersion.getAppName()
      .then(async value => {
        let loading = this.loadingCtrl.create({
          content: this.restoringRes
        });
        loading.present();
        var read = await this.localStorage.readFile(value, this.config.backUpFileName()+".crypt");
        //.then(read => {
          //console.log(read);
          this.helper.aesDecrypt(read)
            .then(data => {
              //var dataJson = JSON.parse(data.toString());
              var sql = data.toString().split(";");
              console.log(data.toString());
              this.sqlite.create({
                name: 'data.db',
                location: 'default'
              })
              .then((db: SQLiteObject) => {
                let dbInstance = db._objectInstance;
                // sql.forEach(data => {
                //   if(data.length > 0){
                //     db.executeSql(data)
                //     .then(_ => {
                //       console.log("restored inserted");
                //     })
                //     .catch(err => {
                //       console.error(err);
                //     });
                //   }
                // });
                for(let i = 0 ; i < sql.length ; i++){
                  var data = sql[i];
                  if(data.length > 0){
                    db.executeSql(data.toString())
                    .then(_ => {
                      console.log(data);
                    })
                    .catch(err => {
                      console.error(err);
                    });
                 }
                }

                var dates = this.helper.getLocalCurrentDate();
                var date = this.helper.getDateString(dates);
                var object = this.restoreStatusModel.createObject("", date, this.config.backUpFileName()+".crypt");
                this.restoreStatusModel.saveRestoreStatus(object);
                loading.dismiss();
                this.navCtrl.setRoot(DisplayimagevideoPage);

               
                // this.sqlitePorter.importSqlToDb(dbInstance, sql)
                // .then(() => {
                //   var dates = this.helper.getLocalCurrentDate();
                //   var date = this.helper.getDateString(dates);
                //   console.log("date : ", date);
                //   var object = this.restoreStatusModel.createObject("", date, this.config.backUpFileName()+".crypt");
                //   this.restoreStatusModel.saveRestoreStatus(object);
                //   loading.dismiss();
                //   this.navCtrl.setRoot(DemoimagevideoPage);
                //   console.log("Retored");
                // })
                // .catch(err => {
                //   console.error(err);
                // });
                //we can pass db._objectInstance as the database option in all SQLitePorter methods
              })
              .catch(err => {
                console.error(err);
              });
            })
            .catch(err => {
              console.error(err);
            });;
        })
        .catch(err => {
          console.error(err);
        });
      // })
      // .catch(err => {
      //   console.error(err);
      // });
    }
  }
}
