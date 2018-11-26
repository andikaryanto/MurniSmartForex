import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiSmartDisplayModel } from '../../models/api-smartdisplay';
import { Device } from '@ionic-native/device';
import { SmartDisplayPlayerConfigurationModel } from '../../models/gen-smartdisplayplayercofiguration';
import * as Enums from '../../enum/enums'
import { ServerModel } from '../../models/gen-server';
import { Resource } from '../../helper/gen-resources';
import { AppVersion } from '@ionic-native/app-version';
import { RegistersettingPage } from '../registersetting/registersetting';
import { DisplaytabularpotraitPage } from '../displaytabularpotrait/displaytabularpotrait';
import { DisplaytabularlandscapePage } from '../displaytabularlandscape/displaytabularlandscape';
import { DisplayimagevideoPage } from '../displayimagevideo/displayimagevideo';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //html
  registeringRes = "";
  //

  appName = "";
  serverModels = {};
  isEnabledRegisterButton : boolean = false;

  backgrounds = [
    'assets/background/background-1.jpg',
    'assets/background/background-2.jpg',
    'assets/background/background-3.jpg',
    'assets/background/background-4.jpg',
    'assets/background/background-7.jpeg' 
  ];

  private playerid : string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private device :  Device,
              private apiSmartDisplayModel : ApiSmartDisplayModel,
              private smartDisplayPlayerConfigurationModel : SmartDisplayPlayerConfigurationModel,
              private serverModel : ServerModel,
              private loadingCtrl : LoadingController,
              private resources : Resource,
              private appVersion : AppVersion) {
                this.init();
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    
  }  

  async init(){
    await this.htmlResources();
    this.appName = await this.appVersion.getAppName();
    this.serverModels = await this.serverModel.getServer();
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.registeringRes = this.resources.RegisteringRes();
  }

  async doRegiter(){
    var uniqueId = this.device.serial;
    var server = this.serverModel.createObject(null, this.serverModels['ServerIP'], this.serverModels['ServerPort']);
    await this.serverModel.saveServer(server);
    let loading = this.loadingCtrl.create({
      content: this.registeringRes
    });
    loading.present();
    if(await this.apiSmartDisplayModel.saveSmartDisplayConfig(this.playerid, uniqueId)){
      var sDPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();
      // if(sDPlayerConfig['LayoutContain'] == Enums.LayoutContain.TabularInformationand1per3Multimedia 
      //     || sDPlayerConfig['LayoutContain'] == Enums.LayoutContain.FullTabularInformation){

      //       if(sDPlayerConfig['LayoutOrientation'] == Enums.ScreenOrientationEnum.Potrait){
      //         this.navCtrl.setRoot(DisplaytabularpotraitPage);
      //       }
      //       else{
      //         this.navCtrl.setRoot(DisplaytabularlandscapePage);
      //       }
      //       loading.dismiss();
      // }
      // else{
        this.navCtrl.setRoot(DisplayimagevideoPage);
        loading.dismiss();
      // }
    }
    else{
      loading.dismiss();
    }
  }

  toSetting(){
    this.navCtrl.push(RegistersettingPage);
  }

  inputOnChange(){
    if(this.serverModels['ServerIP'] != "" && this.serverModels['ServerPort'] != "" && this.playerid != "")
      this.isEnabledRegisterButton = true;
    else 
      this.isEnabledRegisterButton = false;
    //console.log(this.serverModels['ServerIP'], this.serverModels['ServerPort'], this.playerid);
  }

}
