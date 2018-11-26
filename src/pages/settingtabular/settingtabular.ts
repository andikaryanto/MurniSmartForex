import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { CustomToast } from '../../helper/gen-toast';
import { Resource } from '../../helper/gen-resources';

/**
 * Generated class for the SettingtabularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingtabular',
  templateUrl: 'settingtabular.html',
})
export class SettingtabularPage {

  /**HTML Resources */
  tabularSettingRes = "";
  //templateRes = "";
  withMultimediaRes = "";
  withoutMultimediaRes = "";
  multimediaTypeRes = "";
  imageRes = "";
  videoRes = "";
  maxColumnRes = "";
  maxFixedRowRes = "";
  maxDynamicRowRes = "";
  tabularFooterTextRes = "";


  private demoSetting = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private demoSettingModel : DemoSettingModel,
              private customToast : CustomToast,
              private resource : Resource) {
                this.htmlResource();
  }

  ionViewDidLoad() {
    this.loadData();
    console.log('ionViewDidLoad DemosettingtabularPage');
  }

  async htmlResource()
  {
    await this.resource.getLanguage();
    this.tabularSettingRes = this.resource.TabularSettingRes();
    this.withMultimediaRes = this.resource.WithMultimediaRes();
    this.withoutMultimediaRes = this.resource.WithoutMultimediaRes();
    this.multimediaTypeRes = this.resource.MultimediaRes();
    this.imageRes = this.resource.ImageRes();
    this.videoRes = this.resource.VideoRes();
    this.maxFixedRowRes = this.resource.MaxFixedRowRes();
    this.maxColumnRes = this.resource.MaxColumnRes();
    this.maxDynamicRowRes = this.resource.MaxDynamicRowRes();
    this.tabularFooterTextRes = this.resource.TabularFooterTextRes();
  }

  async loadData()
  {
    this.demoSetting = await this.demoSettingModel.getDemoSetting();
  }

  onSelectChange(selectedValue: any, columnName : string) {
    this.demoSettingModel.updateDemoSettingColumn(columnName, selectedValue);
  }

  save()
  {
    this.demoSettingModel.updateDemoSettingColumn("TabularTemplate", this.demoSetting['TabularTemplate']);
    this.demoSettingModel.updateDemoSettingColumn("TabularMaxColumn",this.demoSetting['TabularMaxColumn']);
    this.demoSettingModel.updateDemoSettingColumn("TabularMaxFixedRow", this.demoSetting['TabularMaxFixedRow']);
    // this.demoSettingModel.updateDemoSettingColumn("TabularMulmedType", this.demoSetting['TabularMulmedType']);
    this.demoSettingModel.updateDemoSettingColumn("TabularFooterText", this.demoSetting['TabularFooterText']);
    this.demoSettingModel.updateDemoSettingColumn("TabularMaxDynamicRow", this.demoSetting['TabularMaxDynamicRow']);
    this.customToast.showToast("Setting Saved");
    this.navCtrl.pop();
  }

}
