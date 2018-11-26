import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingCmp, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { LanguageModel } from '../models/gen-language';
import { LocalStorage } from '../helper/gen-localstorage';
import { Page } from 'ionic-angular/navigation/nav-util';
import { Resource } from '../helper/gen-resources';
import { CacheService } from 'ionic-cache';
import { Config } from '../helper/gen-config';
import { ChooselanguagePage } from '../pages/chooselanguage/chooselanguage';
import { RegisterPage } from '../pages/register/register';
import { DemoSettingModel } from '../models/gen-demosetting';
import { SmartDisplayCustomerInfoModel } from '../models/gen-smartdisplaycustomerinfo';
import { AppVersion } from '@ionic-native/app-version';
import { SmartDisplayContainSettingModel } from '../models/gen-smartdisplaycontainsetting';
import { SmartDisplayParameterSettingModel } from '../models/gen-smartdisplayparametersetting';
import { SmartDisplayPlayerConfigurationModel } from '../models/gen-smartdisplayplayercofiguration';
import { BackupStatusModel } from '../models/gen-backupstatus';
import { RestoreStatusModel } from '../models/gen-restorestatus';
import { Helper } from '../helper/helper';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { MultimediaModel } from '../models/gen-multimedia';
import * as Enums from '../enum/enums';
import { ServerModel } from '../models/gen-server';
import { CodePush, InstallMode, SyncStatus   } from '@ionic-native/code-push';
import { CustomPromisify } from 'util';
import { CustomToast } from '../helper/gen-toast';
import { SftpModel } from '../models/gen-sftp';
import { setTimeout } from 'timers';
import { DisplayimagevideoPage } from '../pages/displayimagevideo/displayimagevideo';
import { SettingPage } from '../pages/setting/setting';
import { DisplaytabularpotraitPage } from '../pages/displaytabularpotrait/displaytabularpotrait';
import { DisplaytabularlandscapePage } from '../pages/displaytabularlandscape/displaytabularlandscape';
import { Insomnia } from '@ionic-native/insomnia';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
/**Html Respurce */
settingRes = "";
downloadingUpdateRes = "";

//rootPage:any = HomePage;
useracc : {};
username : string;
pages: Array<{title: string, component: any}>;
LoginUse : number;
languages = {};
customerInfo = {};
restoreStatus = {};
downloadProgress : number = 0;
loading : any;


  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private splashScreen: SplashScreen,
              public localStorage : LocalStorage,
              private languageModel : LanguageModel,
              private resource : Resource,
              private config : Config,
              private cache : CacheService,
              private demoSettingModel : DemoSettingModel,
              private smartDisplayCustomerInfoModel : SmartDisplayCustomerInfoModel,
              private smartDisplayContainSettingModel : SmartDisplayContainSettingModel,
              private smartDisplayParameterSettingModel : SmartDisplayParameterSettingModel,
              private smartDisplayPlayerConfigurationModel : SmartDisplayPlayerConfigurationModel,
              private backupStatusModel : BackupStatusModel,
              private restoreStatusModel : RestoreStatusModel,
              private multimediaModel : MultimediaModel,
              private serverModel : ServerModel,
              private sftpModel : SftpModel,
              private helper : Helper,
              private appVersion : AppVersion,
              private sqlite : SQLite,
              private sqlitePorter : SQLitePorter,
              private codePush : CodePush,
              private loadingCtrl : LoadingController,
              private toast : CustomToast,
              private alertCtrl : AlertController,
              private insomnisa : Insomnia
              ) {
    this.InitializeComponent();
    this.resources();
  }

  InitializeComponent()
  {
    //this.page.statBar();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.checkUpdate();
      this.doStayAwake();
      this.localStorage.createMultimediaFolder();
      this.htmlResources();
      this.appVersion.getAppName()
      .then(ret => {
        this.localStorage.createPathFolder(ret);
        console.log(ret);
      })
      .catch(err => {
        
      });
      console.log("ret");
      this.codePush.getCurrentPackage();
      //this.page.statBar();
      this.cachingGallery();
      //this.cacheScreenResolution();
      this.migrationDatabase();
      this.init();
    });
  }

  async htmlResources()
  {
    await this.resource.getLanguage();
    this.downloadingUpdateRes = this.resource.DownloadingUpdateRes();
  }

  doStayAwake(){
    this.insomnisa.keepAwake()
    .then(_ => {
      
    })
    .catch(err => {
      console.error(err);
    })
  }

  checkUpdate(){
    this.codePush.checkForUpdate()
    .then(data => {
      console.log("data", data);
      if(data){
        this.loading = this.loadingCtrl.create({
          content: this.downloadingUpdateRes + this.downloadProgress.toString() + "%"
        });
        this.loading.present();
        this.checkCodePush();
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  checkCodePush() {
    this.codePush.sync(null, progress => {
      this.downloadProgress = (progress.receivedBytes / progress.totalBytes ) * 100;
      this.loading.setContent(this.downloadingUpdateRes + Math.round(this.downloadProgress).toString() + "%");
    }).subscribe(
      (data) => {
        if(Number(data) == Number(SyncStatus.INSTALLING_UPDATE)){
          this.loading.dismiss();
          this.loading.onDidDismiss(_ => {
            this.toast.showToast("Restarting Application...");
          })
        }
      },
      (err) => {
        console.error(err);
        this.loading.dismiss();
      }
    );
 }

  async migrationDatabase(){
      this.demoSettingModel.init();
      this.serverModel.init();
      this.smartDisplayCustomerInfoModel.init();
      this.smartDisplayContainSettingModel.init();
      this.smartDisplayParameterSettingModel.init();
      this.smartDisplayPlayerConfigurationModel.init();
      this.backupStatusModel.init();
      this.multimediaModel.init();
      this.restoreStatusModel.init();
      this.sftpModel.init();
  }

  
  
  async cacheScreenResolution()
  {
    this.cache.setDefaultTTL(60 * 60 * 24);
    let cacheKey = this.config.chaceScreenResolution();;
    this.cache.removeItem(cacheKey);
    let ttl = 60 * 60 * 24;
    //let request = await this.localStorage.getAllImagesGallery();

    let data =  await this.cache.getOrSetItem(cacheKey, () => this.config.getScreenResolution(), null, ttl);
    
    console.log("Saved data: ", data);
  }

  async cachingGallery() {
    //this.cache.setDefaultTTL(60 * 60 * 24);
    let cacheKey = this.config.chaceGalleryKey();;
    this.cache.removeItem(cacheKey);
    let ttl = 60 * 60 * 24;
    //let request = await this.localStorage.getAllImagesGallery();

    let data =  await this.cache.getOrSetItem(cacheKey, () => this.localStorage.getAllImageGallery(), null, ttl);
    
    console.log("Saved data gal: ", data);
  }

  async resources()
  {
    await this.resource.getLanguage();
    this.settingRes = this.resource.SettingRes();
    
    this.pages = [
      // { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      // { title: 'Profile', component: UserprofilePage },
      // { title: 'Gallery', component: GalleryPage },
      // { title: 'Maps', component: MapPage },
      { title: 'SmartDisplay', component: DisplayimagevideoPage },
      { title: this.settingRes, component: SettingPage },
      //{ title: 'Table', component: DemotabularwithoutmultimediaPage },
      //{ title: 'Tester', component: TesterPage },
      //{ title: 'User', component: UserPage },
      // { title: 'Logout', component: "" }
    ];
  }

  async init()
  {
    this.languages = await this.languageModel.getLanguage();
    var sDPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();
    this.customerInfo = await this.smartDisplayCustomerInfoModel.getSmartDisplayCustomerInfo();
    //console.log("getttt");

    if(this.languages["Language"] !== undefined && this.languages["Language"] !== null)
    {
      if(this.customerInfo['PlayerID'] !== undefined && this.customerInfo['PlayerID'] !== null){
        // if(sDPlayerConfig['LayoutContain'] == Enums.LayoutContain.TabularInformationand1per3Multimedia 
        //   || sDPlayerConfig['LayoutContain'] == Enums.LayoutContain.FullTabularInformation){
        //   if(sDPlayerConfig['LayoutOrientation'] == Enums.ScreenOrientationEnum.Potrait){
        //     this.rootPage = DisplaytabularpotraitPage;
        //   }
        //   else{
        //     this.rootPage = DisplaytabularlandscapePage;
        //   }
        // }
        // else{
          this.rootPage = DisplayimagevideoPage;
        // }
      }else{
        this.rootPage = RegisterPage;
      }
    }
    else
    {
      this.rootPage = ChooselanguagePage;
    }
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Logout")
    {
      //console.log("should Be Here");
      //this.doLogout();
    }
    else
    {
      this.nav.setRoot(page.component);
      console.log(page.title);
    }
  }

  Home()
  {
    this.rootPage = HomePage;
  }
}

