import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide, Slides } from 'ionic-angular';
import { DemoSettingModel } from "../../models/gen-demosetting";
import { CustomToast } from '../../helper/gen-toast';
import { Config } from '../../helper/gen-config';
import { Resource } from '../../helper/gen-resources';
import { LocalStorage } from '../../helper/gen-localstorage';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { ApiSmartDisplayModel } from '../../models/api-smartdisplay';
import { SmartDisplayCustomerInfoModel } from '../../models/gen-smartdisplaycustomerinfo';
import { SmartDisplayPlayerConfigurationModel } from '../../models/gen-smartdisplayplayercofiguration';
import { Helper } from '../../helper/helper';
import { MultimediaModel } from '../../models/gen-multimedia';
import * as Enums from '../../enum/enums';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as errorMessage from '../../resources/errorMessage'
import { DisplaytabularlandscapePage } from '../displaytabularlandscape/displaytabularlandscape';
import { DisplaytabularpotraitPage } from '../displaytabularpotrait/displaytabularpotrait';
import { SettingPage } from '../setting/setting';

/**
 * Generated class for the DisplayimagevideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-displayimagevideo',
  templateUrl: 'displayimagevideo.html',
})
export class DisplayimagevideoPage {

  @ViewChild('mVideoPlayer') mVideoPlayer: ElementRef;
  @ViewChild('scrollingText') scrollingText: ElementRef;
  @ViewChild(Slides) slides: Slides;

  private isImmersive : boolean = false;
  private isPotrait : boolean = true;
  private backgrounds = [];
  private videos = [];
  private videosPlayed = 0;
  private folderToDisplay : string = "";
  private isUseTicker = false;
  private demoSetting : any;
  private sdPlayerConfig : any;
  private infoCustomer : any;
  private isButtonHide : boolean = true;
  private ticker : any;
  private runningTicker : string = "";
  private innerHtmlVideoPlayer = "";
  private newFileFound = false;
  private apiTicker : any;
  private slideSpeed : number;
  private autoPlay : number;
  private runningTickers = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private demoSettings : DemoSettingModel,
              private customToast : CustomToast,
              private config : Config,
              private resource : Resource,
              private localStorage : LocalStorage,
              private androidFullScreen: AndroidFullScreen,
              private apiSmartDisplayModel : ApiSmartDisplayModel,
              private smartDisplayCustomerInfoModel : SmartDisplayCustomerInfoModel,
              private smartDisplayPlayerConfigurationModel : SmartDisplayPlayerConfigurationModel,
              private helper : Helper,
              private multimediaModel : MultimediaModel) {
              //this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemoimagevideoPage');
    this.initApi();
  }
  //api file region
  async initApi(){
    this.demoSetting = await this.demoSettings.getDemoSetting();
    this.infoCustomer = await this.smartDisplayCustomerInfoModel.getSmartDisplayCustomerInfo();
    this.sdPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();

    if(this.sdPlayerConfig['LayoutOrientation'] == Enums.ScreenOrientationEnum.Landscape)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    else if(this.sdPlayerConfig['LayoutOrientation'] == Enums.ScreenOrientationEnum.Potrait)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    this.fullScreen();
    await this.getDataMultimediaApi();
    // if(this.sdPlayerConfig['LayoutContain'] == Enums.LayoutContain.FullMultimediaandticker){
      this.isUseTicker = true;
      await this.getTickerApi();
      this.scrollingTextElement();
    // }
  }

  async getTickerApi(){
    setInterval( async () => { 
      var ticker = await this.apiSmartDisplayModel.doGetUpdatedTickerByPlayerID(this.infoCustomer['PlayerID']);
      if(this.apiTicker != undefined){
        if(ticker['SResultCode'] == "SUCCESS"){
          if(this.apiTicker['SmartDisplayPlayer'][0]['LastUpdate'][0] != ticker['SmartDisplayPlayer'][0]['LastUpdate'][0]){
            this.apiTicker = ticker;
            this.setTicker(this.apiTicker);
          }
        }
      } else {
        if(ticker['SResultCode'] == "SUCCESS"){
          this.apiTicker = ticker;
          this.setTicker(this.apiTicker);
        }
      }
    }, 1000);
  }

  setTicker(data){
    this.runningTickers = [];
    var ticker = data['SmartDisplayTicker'][0]['TickerInfo'];
    for(let i = 0 ; i < ticker.length; i++)
    { 
      if(ticker[i]['IsDelete'] == "F" 
        && this.helper.getLocalCurrentDate() <= this.helper.getDateFromString(ticker[i]['DeactivationDate'].toString(), 23, 59, 59)
        && this.helper.getLocalCurrentDate() >= this.helper.getDateFromString(ticker[i]['ActivationDate'].toString())){
          this.runningTickers.push(ticker[i]['Text']);
      }
    }
    console.log(this.runningTickers);
  }

  async getDataMultimediaApi(){
    //this.backgrounds.push("file:///storage/emulated/0/Android/data/io.ionic.starter/files/Smart Images/panteq_20180926094132.jpg");
    
    //await this.getMultimedia();
    setInterval( async () => { 
      var data = await this.apiSmartDisplayModel.doGetUpdatedMultimediaByPlayerID(this.infoCustomer['PlayerID']);
      if(data['result'] == "SUCCESS"){
        for(let i = 0 ; i < data['listMultimedia'].length; i++){
          this.apiSmartDisplayModel.saveData(data['listMultimedia'][i])
          .then((object) => {
            if(this.backgrounds.length == 0){
              this.getMultimedia()
              .then(()=>{
              })
              .catch(err => {
              });
            }
          })
          .catch(err => {
            //console.log("err", err)
          });
        }
      }
    }, 1000);
    await this.getMultimedia();
    //console.log("aa",this.backgrounds);
  }
  //end api


  //localy fil region
  async getXML()
  {
    this.ticker = await this.localStorage.getDataLocalXml();
    for(let i = 0 ; i < this.ticker.length; i++)
    { 
      this.runningTickers.push(this.ticker[i].Text[0]);
    }
  }

  ionViewWillLeave() {

    this.androidFullScreen.showSystemUI();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
  }

  hideUnhideButton()
  {
    this.isButtonHide = this.isButtonHide ? true : true;
  }
  async init()
  {
    this.demoSetting =  await this.demoSettings.getDemoSetting();
    if(! await this.localStorage.isMultimediaImageExist())
    {
      this.customToast.showToast(this.resource.SetMultimediaFirstRes());
      this.androidFullScreen.showSystemUI();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
      this.navCtrl.setRoot(SettingPage);
    }
    else
    {
      if(this.demoSetting['ScreenOrientation'] === Enums.ScreenOrientationEnum.Landscape)
      {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
      else if(this.demoSetting['ScreenOrientation'] === Enums.ScreenOrientationEnum.Potrait)
      {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      this.fullScreen();
      this.UseTicker();

      //this.dataToDisplay(this.config.imageDir());
      this.getMultimedia();
    }
  }

  UseTicker()
  {
    if(this.demoSetting['UseTicker'] === Enums.YesNoEnum.Yes)
    {
      this.isUseTicker = true;
      this.getXML();
      this.scrollingTextElement();
    }
    else
    {
      this.isUseTicker = false;
      this.runningTicker = "";
    }
  }

  fullScreen()
  {
    //console.log(event);
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => {
      if(!this.isImmersive)
      { 
        this.androidFullScreen.immersiveMode();
        this.scrollingTextElement();
        this.isImmersive = true;
      }
      else
      {
        this.androidFullScreen.showSystemUI();
        this.scrollingTextElement();
        this.isImmersive = false;
      }
    })
    .catch(err => console.log(err));

  }

  // not used yet
  changeScreenOrientation()
  {
    this.screenOrientation.unlock();
    if(this.isPotrait)
    {
      this.isPotrait = false;
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

      this.scrollingTextElement();
    }
    else
    {
      this.isPotrait = true;
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      //
      this.scrollingTextElement();
    }
  }

  slideReachEnd(){
    this.slides.stopAutoplay();
    // this.backgrounds = [];
    // this.getImage()
    // .then(()=>{
    //   console.log("get Multimedia Done");
    //   console.log(this.backgrounds);
    //   //this.slides.update(1);
    // })
    // .catch(err => {
      
    //   console.log("err get mu", err)
    // });
  }

  async slideAutoPlayStops(){
    await this.getVideo();
    if(this.videos.length == 0){
      this.getImage()
      .then(()=>{
        console.log("get Multimedia Done");
        console.log(this.backgrounds);
        //this.slides.update(1);
      })
      .catch(err => {
        console.log("err get mu", err)
      });
      //this.slides.startAutoplay();
    }
  }

  slideChanges(){
    if(this.slides.isEnd()){
      console.log("is End : ", true);
      //this.slides.stopAutoplay();
      this.backgrounds = [];
      this.getImage()
      .then(()=>{
        console.log("get Multimedia Done");
        console.log(this.backgrounds);
        //this.slides.update(1);
      })
      .catch(err => {
        
        console.log("err get mu", err)
      });
    }
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("current index", currentIndex);
    this.slideSpeed = this.helper.getTimeToMs(this.getImageDisplayByIndex(currentIndex)[0]['Duration']);
    this.autoPlay = this.slideSpeed - 2000;
  }

  async getMultimedia()
  {
    if(this.demoSetting['MultimediaPriority'] ===  Enums.MultimediType.Image)
    {
      await this.getImage();
    }
    else
    {
      await this.getVideo();
    }
  }

  async getImage()
  {
    this.videos = [];
    try{
      let entry : any = await this.multimediaModel.getMultimediaByType(Enums.ApiSmartDisplayMultimediaType.StillImage);
        for(let i = 0 ; i < entry.length ; i ++)
        {
          if(!this.isMultimediaExist(entry[i])){
              this.backgrounds.push(entry[i]);
              this.slideSpeed = this.helper.getTimeToMs(entry[i]['Duration']);
          }
        }
    }
    catch(err)
    {
      console.log(err);
    }
    // try{
    //   let entry : any = await this.localStorage.getGalleryToDisplay(this.config.imageDir());
    //     for(let i = 0 ; i < entry.length ; i ++)
    //     {
    //       if(!entry[i].isDirectory && !this.isDataExist(entry[i])){
    //           this.backgrounds.push(entry[i].nativeURL);
    //       }
    //     }
    //     console.log("backgrounds", this.backgrounds);  
    // }
    // catch(err)
    // {
    //   console.log(err);
    // }
  }

  async getVideo()
  {
    this.backgrounds = [];
    try{
      let entry : any = await this.multimediaModel.getMultimediaByType(Enums.ApiSmartDisplayMultimediaType.VCD);
        for(let i = 0 ; i < entry.length ; i ++)
        {
          if(!this.isMultimediaExist(entry[i])){
              this.videos.push(entry[i]);
          }
        }
        setTimeout(() => {
          this.playVideo();
        }, 10);
    }
    catch(err)
    {
      console.log(err);
    }
      // try{
      //   let entry : any = await this.localStorage.getGalleryToDisplay(this.config.videoDir());
      //     for(let i = 0 ; i < entry.length ; i ++)
      //     {
      //       if(!entry[i].isDirectory && !this.isDataExist(entry[i]))
      //         this.videos.push(entry[i].nativeURL);
      //     }
      //     setTimeout(() => {
      //       this.playVideo();
      //     }, 10);
      // }
      // catch(err)
      // {
      //   console.log(err);
      // }
      
  }

  playVideo()
  {
    var video = document.getElementsByTagName('video')[0];
    if(this.videosPlayed < this.videos.length)
    {
      var url = this.videos[this.videosPlayed]['LocalPath'];
      video.src =  this.videos[this.videosPlayed]['LocalPath'];
      video.play()
      .then()
      .catch((err)=>{
        console.log(err);
        if (err.toString()=== errorMessage.multimediaNotSupported)
        {
          this.videos.splice(this.videosPlayed,1);
          var path = this.localStorage.getPath(url,1);
          var name = this.localStorage.getName(url);
          this.apiSmartDisplayModel.reDownloadMultimedia(path,name,Enums.ApiSmartDisplayMultimediaType.VCD);

        } 
        // this.getImage()
        // .then(()=>console.log('Succes'))
        // .catch(err=>console.log(err));
      });
      this.videosPlayed ++;
    }
    else
    {
      this.videosPlayed = 0;
      // video.src =  this.videos[this.videosPlayed];
      // video.play();
      // console.log(this.videos[this.videosPlayed]);
      //this.videosPlayed ++;
      this.getImage();
    }
  }
  
  scrollingTextElement() 
  {
    setTimeout(() => {
      var height = window.outerHeight;
      // this.renderer.setElementStyle(this.scrollingText.nativeElement
      //   , 'top' , 'calc('+height+'px - 50px)'); //-290px
      document.getElementById("scrolText").style.top = (height - 50) + "px";
      
    }, 1500);
     
  }

  isDataExistFromApi(data){
    var isExist = false;
    if(this.demoSetting["MultimediaPriority"] === Enums.MultimediType.Image)
    {
      for(let i = 0 ; i < this.backgrounds.length ; i ++)
      {
        if(data['LocalPath'] === this.backgrounds[i] )
        {
          isExist = true;
          break;
        }
      }
    }
    else
    {
      for(let i = 0 ; i < this.videos.length ; i ++)
      {
        if(data.nativeURL === this.videos[i] )
        {
          isExist = true;
          break;
        }
      }
    }

    return isExist;
  }

  isMultimediaExist(data) : boolean{
    var isExist = false;
    if(data['MultimediaType'] == Enums.ApiSmartDisplayMultimediaType.StillImage){
      for(let i = 0 ; i < this.backgrounds.length ; i ++)
      {
        if(data['LocalPath'] === this.backgrounds[i]['LocalPath'])
        {
          isExist = true;
          break;
        }
      }
    } else {
      for(let i = 0 ; i < this.videos.length ; i ++)
      {
        if(data['LocalPath'] === this.videos[i]['LocalPath'] )
        {
          isExist = true;
          break;
        }
      }
    }
    return isExist;
  }
  

  isDataExist(data) : boolean
  {
    var isExist = false;
    if(this.demoSetting["MultimediaPriority"] === Enums.MultimediType.Image)
    {
      for(let i = 0 ; i < this.backgrounds.length ; i ++)
      {
        if(data.nativeURL === this.backgrounds[i] )
        {
          isExist = true;
          break;
        }
      }
    }
    else
    {
      for(let i = 0 ; i < this.videos.length ; i ++)
      {
        if(data.nativeURL === this.videos[i] )
        {
          isExist = true;
          break;
        }
      }
    }

    return isExist;
  }

  getImageDisplayByIndex(index){
   var data = this.backgrounds.slice(index - 1,index);
   return data;
  }

  displayTabular()
  {
    if(this.sdPlayerConfig['LayoutOrientation'] === Enums.ScreenOrientationEnum.Landscape)
      this.navCtrl.setRoot(DisplaytabularlandscapePage);
    else
      this.navCtrl.setRoot(DisplaytabularpotraitPage);
  }

}
