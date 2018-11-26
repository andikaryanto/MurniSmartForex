import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DemosettingimagemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingimagemodal',
  templateUrl: 'settingimagemodal.html',
})
export class SettingimagemodalPage {
  
  private images = [];
  private open_at_index : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.open_at_index = this.navParams.get('photo_index');
    this.images = this.navParams.get('images');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemosettingimagemodalPage');
  }
  close()
  {
    this.navCtrl.pop();
  }
}
