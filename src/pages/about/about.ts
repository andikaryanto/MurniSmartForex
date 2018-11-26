import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  appName = "";
  appVersions = "";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private appVersion : AppVersion) {
                this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  async init(){
    this.appName = await this.appVersion.getAppName();
    this.appVersions = "Version " + await this.appVersion.getVersionNumber();
  }

}
