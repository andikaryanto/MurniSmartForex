import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Resource } from '../../helper/gen-resources';
import { LanguageModel } from '../../models/gen-language';
import { CustomToast } from '../../helper/gen-toast';

/**
 * Generated class for the SettinglanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settinglanguage',
  templateUrl: 'settinglanguage.html',
})
export class SettinglanguagePage {

  //html Resources
  languageSettingRes = "";
  settingSavedgRes = "";
  //local variable
  languages : any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resources : Resource,
              private languageModel : LanguageModel,
              private toast : CustomToast) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemosettinglanguagePage');
    this.htmlResources();
    this.init();
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.languageSettingRes = this.resources.LanguageSettingRes();
    this.settingSavedgRes = this.resources.SettingSavedRes();
  }

  async init()
  {
    this.languages = await this.languageModel.getAvalaibaleLanguage();
    console.log(this.languages);
  }

  updateLanguage(language)
  {
    //console.log(language);
    for(let i = 0 ; i < this.languages.length; i++)
    {
      if(this.languages[i].Id === language)
          this.languages[i].Selected = true;
      else 
          this.languages[i].Selected = false;
    }

    console.log(this.languages);
  }

  save()
  {
    for(let i = 0 ; i < this.languages.length; i++)
    {
      if(this.languages[i].Selected)
        this.languageModel.updatelanguageColumn("Language", this.languages[i].Id)
    }
    this.toast.showToast(this.settingSavedgRes);
    this.navCtrl.pop();
  }

}
