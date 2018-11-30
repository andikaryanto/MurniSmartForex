import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { CustomToast } from '../../helper/gen-toast';
import { Resource } from '../../helper/gen-resources';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

/**
 * Generated class for the SettinggeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settinggeneral',
  templateUrl: 'settinggeneral.html',
})
export class SettinggeneralPage {

  /** HTML Resources */
  generalSettingRes = "";
  screenOrientationRes = "";
  showTickerRes = "";
  yesRes = "";
  noRes = "";
  imageRes = "";
  videoRes = "";
  multimediaPriorityRes = "";

  demoSetting = {};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public demoSettingModel : DemoSettingModel,
              private customToast : CustomToast,
              private resources : Resource,
              private menuCtrl : MenuController) {
                
             this.htmlResources();
  }

  ionViewDidLoad() {
    this.loadData();
    //this.menuCtrl.enable(true, "sideMenu");
    console.log('ionViewDidLoad DemosettinggeneralPage');
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.generalSettingRes = this.resources.GeneralSettingRes();
    this.screenOrientationRes = this.resources.ScreenOrientationRes();
    this.showTickerRes = this.resources.ShowTickerRes();
    this.yesRes = this.resources.YesRes();
    this.noRes = this.resources.NoRes();
    this.imageRes = this.resources.ImageRes();
    this.videoRes = this.resources.VideoRes();
    this.multimediaPriorityRes = this.resources.MultimediaPriorityRes();
  }
  async loadData()
  {
    this.demoSetting = await this.demoSettingModel.getDemoSetting();
  }

  onSelectChange(selectedValue: any, folderName : string) {
    this.demoSettingModel.updateDemoSettingColumn(folderName, selectedValue);
  }

  save()
  {
    this.customToast.showToast("Setting Saved");
    this.navCtrl.pop();
  }

}
