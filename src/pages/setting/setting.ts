import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { Resource } from '../../helper/gen-resources';
import { LocalStorage } from '../../helper/gen-localstorage';
import { SettingimagePage } from '../settingimage/settingimage';
import { SettingvideoPage } from '../settingvideo/settingvideo';
import { SettingtabularPage } from '../settingtabular/settingtabular';
import { SettinggeneralPage } from '../settinggeneral/settinggeneral';
import { SettinglanguagePage } from '../settinglanguage/settinglanguage';
import { SettingbackupPage } from '../settingbackup/settingbackup';
import { AboutPage } from '../about/about';
import { SftpsettingPage } from '../sftpsetting/sftpsetting';
import { Config } from '../../helper/gen-config';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  //@ViewChild(Nav) nav: Nav;
  //Html Strings
  generalRes = "";
  settingRes = "";
  multimediaRes = "";
  imageRes = "";
  videoRes = "";
  tabularRes = "";
  languageRes = "";
  landscapeRes = "";
  backupRes = "";
  aboutRes = "";
  applicationinfoRes = "";

  selectedLanguages = "";
  screenOrientation = "";
  tamplate = "";
  imageCount = 0;
  videoCount = 0;
  
  //End

  languages = {};
  demoSetting = {};
  images = [];
  videos = [];
  demoSettingObject = {};
  tabularPattern = "[0-9]";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private demoSettingModel : DemoSettingModel,
              private resources : Resource,
              private localStorage : LocalStorage,
              private config : Config,
              private menuCtrl : MenuController) {
                this.htmlResources();
  }

  ionViewDidLoad() {
    //this.updateFolderIsNotExist();
    //console.log('ionViewDidLoad DemosettingPage');
  }

  async htmlResources()
  {
    this.languages = await this.resources.getLanguage();
    this.generalRes = this.resources.GeneralRes();
    this.settingRes = this.resources.SettingRes();
    this.multimediaRes = this.resources.MultimediaRes();
    this.imageRes = this.resources.ImageRes();
    this.videoRes = this.resources.VideoRes();
    this.tabularRes = this.resources.TabularRes();
    this.languageRes = this.resources.LanguageRes();
    this.backupRes = this.resources.BackupRes();
    this.aboutRes = this.resources.AboutRes();
    this.applicationinfoRes = this.resources.ApplicationInfoRes();
    this.selectedLanguages = this.languages["LanguageString"];
  }

  ionViewDidEnter()
  {
    this.loadData();
    
    //this.menuCtrl.enable(true, "sideMenu");
    //console.log('ionViewDidEnter DemosettingPage');
  }

  async updateFolderIsNotExist()
  {
    console.log(this.demoSettingObject['ImageFolder']);
    try{
      // var isExist = await this.localStorage.isFolderExist(this.demoSettingObject['ImageFolder']);
      // console.log(isExist);
      // // .then(_ =>
      // // {
       
      // // })
      // // .catch(err =>
      // // {
      // //   this.demoSettingModel.updateDemoSettingColumn("ImageFolder",null);
      // //   console.error(err);
      // // })
      // if(isExist)
      //   this.demoSettingModel.updateDemoSettingColumn("ImageFolder",this.demoSettingObject['ImageFolder']);
      // else
      // this.demoSettingModel.updateDemoSettingColumn("ImageFolder",null);
     
    }
    catch(err)
    {
      this.demoSettingModel.updateDemoSettingColumn("ImageFolder",null);
      console.log("err catch");
    }
  }

  async loadData()
  {
    this.demoSetting = await this.demoSettingModel.getDemoSetting();
    this.screenOrientation = this.demoSetting["ScreenOrientationString"];
    this.tamplate = this.demoSetting["TabularTemplateString"];
    this.images = await this.localStorage.getGalleryToDisplay(this.config.imageDir());
    this.videos = await this.localStorage.getGalleryToDisplay(this.config.videoDir());
    this.imageCount = this.images.length;
    this.videoCount = this.videos.length;
  }

  toImageSetting()
  {
    this.navCtrl.push(SettingimagePage, {folderName : this.demoSetting['ImageFolder']});

  }

  toVideoSetting()
  {
    this.navCtrl.push(SettingvideoPage, {folderName : this.demoSetting['VideoFolder']});

  }


  toTabularSetting()
  {
    this.navCtrl.push(SettingtabularPage);

  }

  toDemoSettingGeneral()
  {
    this.navCtrl.push(SettinggeneralPage);
  }

  toLanguageSetting()
  {
    this.navCtrl.push(SettinglanguagePage);
  }

  toBackUpSetting(){
    this.navCtrl.push(SettingbackupPage);
  }
  toAppInfo(){
    this.navCtrl.push(AboutPage);
  }
  toSFTP(){
    this.navCtrl.push(SftpsettingPage);
  }

}
