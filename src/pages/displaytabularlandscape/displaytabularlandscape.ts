import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { Config } from '../../helper/gen-config';
import { LocalStorage } from '../../helper/gen-localstorage';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Resource } from '../../helper/gen-resources';
import { CacheService } from 'ionic-cache';
import { SmartDisplayPlayerConfigurationModel } from '../../models/gen-smartdisplayplayercofiguration';
import { SmartDisplayCustomerInfoModel } from '../../models/gen-smartdisplaycustomerinfo';
import { ApiSmartDisplayModel } from '../../models/api-smartdisplay';
import { Helper } from '../../helper/helper';
import { MultimediaModel } from '../../models/gen-multimedia';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as Enums from '../../enum/enums';
import * as errorMessage from '../../resources/errorMessage'
import { DisplayimagevideoPage } from '../displayimagevideo/displayimagevideo';
import { MenuController } from 'ionic-angular/components/app/menu-controller';


/**
 * Generated class for the DisplaytabularlandscapePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-displaytabularlandscape',
  templateUrl: 'displaytabularlandscape.html',
})
export class DisplaytabularlandscapePage {

  @ViewChild('mVideoPlayer') mVideoPlayer: ElementRef;
  @ViewChild('scrollingText') scrollingText: ElementRef;
  @ViewChild(Slides) slides: Slides;


  /**HTML Resources */
  sellRes = "";
  buyRes = "";
  dateRes = "";
  timeRes = "";
  /**END */

  myDate: any = "";
  myTime: any = "";
  demoSetting : any;
  sdPlayerConfig : any;
  infoCustomer : any;
  dataCurrency : any = [];
  fixedCurrency : any = [];
  dynamicCurrency : any = [];
  videos : any = [];
  images : any = [];
  ticker = [];
  column = [];
  isUseMulmed = false;
  isUseTicker = false;
  isButtonHide = true;
  isImmersive = false;
  buyCount = 0;
  sellCount = 0;
  fixedColumn = 0;
  fixedRow = 0;
  dynamicRow = 0;
  videosPlayed=0;
  emptyDataDynamicRow = 0;

  headerElementHeight = 0;
  dateInfoElementHeight = 0;
  gridElementHeight = 0;
  footerElementHeight = 0;
  tickerElementHeight = 0;
  singleRowHeight = 0;
  tickerHeight = 0;
  innerHtmlVideoPlayer = "";
  runningTicker ="";
  footerText ="";
  runningTickers = [];
  intervalTime : any;
  intervalTable : any;
  slideSpeed : number;
  autoPlay : number;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private config : Config,
              private localStorage : LocalStorage,
              private demoSettings : DemoSettingModel,
              private platform : Platform,
              private renderer : Renderer,
              private screenOrientation: ScreenOrientation,
              private androidFullScreen : AndroidFullScreen,
              private resource : Resource,
              private cache : CacheService,
              private smartDisplayPlayerConfigurationModel : SmartDisplayPlayerConfigurationModel,
              private smartDisplayCustomerInfoModel : SmartDisplayCustomerInfoModel,
              private apiSmartDisplayModel : ApiSmartDisplayModel,
              private helper : Helper,
              private multimediaModel : MultimediaModel,
              private menuCtrl : MenuController) {
                this.htmlResources();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemotabularlandscapePage');
    
    this.initApi();
  }

  ionViewWillLeave()
  {
    clearInterval(this.intervalTime);
    clearInterval(this.intervalTable);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
    this.androidFullScreen.showSystemUI();
  }

  async htmlResources()
  {
    await this.resource.getLanguage();
    this.sellRes = this.resource.SellRes();
    this.buyRes = this.resource.BuyRes();
    this.timeRes = this.resource.TimeRes();
    this.dateRes = this.resource.DateRes();
  }

  async initApi(){
    this.menuCtrl.enable(true, "sideMenu");
    console.log(this.cache.getItem(this.config.chaceGalleryKey())) 
    this.demoSetting =  await this.demoSettings.getDemoSetting();
    this.infoCustomer = await this.smartDisplayCustomerInfoModel.getSmartDisplayCustomerInfo();
    this.sdPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();
    this.setLandscape();
    
    if(this.sdPlayerConfig['LayoutContain'] == Enums.LayoutContain.TabularInformationand1per3Multimedia)
    {
      this.isUseMulmed = true;
      await this.getDataMultimediaApi();
    }

    var Dates = new Date();
    var Day = await this.config.getDay(Dates.getDay());
    var DateInt = Dates.getDate();
    var Month = await this.config.getMonth(Dates.getMonth() + 1);
    var Year = Dates.getFullYear().toString();
    this.myDate = this.dateRes +" : "+ Day +", "+DateInt +" "+ Month+" " + Year;

    this.intervalTime = setInterval(() =>
      {
        var Dates = new Date();
        var Hour = Dates.getHours().toString();
        var Minute = "0" + Dates.getMinutes().toString();
        Minute = Minute.substr(Minute.length - 2, 2);
        var Second = "0" +Dates.getSeconds();
        Second = Second.substr(Second.length - 2, 2);
        this.myTime = this.timeRes + " : " + Hour +": " +Minute+": "+ Second; 
      }, 1000
    )

    this.footerText = this.demoSetting['TabularFooterText'];
    //make it landscape
    this.fullScreen();
    
    this.innerHtml();
    this.getDataCurrency();
    //await this.UseTicker();
    this.gridElement();
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
            if(this.images.length == 0){
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

  slideReachEnd(){
    this.slides.stopAutoplay();
  }

  async slideAutoPlayStops(){
    await this.getVideo();
    if(this.videos.length == 0){
      this.getImage()
      .then(()=>{
        console.log("get Multimedia Done");
        console.log(this.images);
        //this.slides.update(1);
      })
      .catch(err => {
        console.log("err get mu", err)
      });
      //this.slides.startAutoplay();
    }
  }


  async init()
  {
    //console.log(this.cache.getItem(this.config.chaceGalleryKey())) 
    this.demoSetting =  await this.demoSettings.getDemoSetting();
    this.sdPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();
    this.setLandscape();

    var Dates = new Date();
    var Day = await this.config.getDay(Dates.getDay());
    var DateInt = Dates.getDate();
    var Month = await this.config.getMonth(Dates.getMonth() + 1);
    var Year = Dates.getFullYear().toString();
    this.myDate = this.dateRes +" : "+ Day +", "+DateInt +" "+ Month+" " + Year;

    this.intervalTime = setInterval(() =>
      {
        var Dates = new Date();
        var Hour = Dates.getHours().toString();
        var Minute = "0" + Dates.getMinutes().toString();
        Minute = Minute.substr(Minute.length - 2, 2);
        var Second = "0" +Dates.getSeconds();
        Second = Second.substr(Second.length - 2, 2);
        this.myTime = this.timeRes + " : " + Hour +": " +Minute+": "+ Second; 
      }, 1000
    )

    this.footerText = this.demoSetting['TabularFooterText'];
    //make it landscape
    this.fullScreen();
    
    this.innerHtml();
    this.getDataCurrency();
    if(this.sdPlayerConfig['LayoutContain'] == Enums.LayoutContain.TabularInformationand1per3Multimedia)
    {
      this.isUseMulmed = true;
      await this.getMultimedia();
    }
    //await this.UseTicker();
    this.gridElement();
  }

  setLandscape()
  {
    setTimeout(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }, 500);
  }

  fullScreen()
  {
    //console.log(event);
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => {
      console.log('Immersive mode supported');
      if(!this.isImmersive)
      { 
        this.androidFullScreen.immersiveMode();
        // this.scrollingTextElement();
        this.isImmersive = true;
      }
      else
      {
        this.androidFullScreen.showSystemUI();
        // this.scrollingTextElement();
        this.isImmersive = false;
      }
    })
    .catch(err => console.log(err));

  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("current index", currentIndex);
    this.slideSpeed = this.helper.getTimeToMs(this.getImageDisplayByIndex(currentIndex)[0]['Duration']);
    this.autoPlay = this.slideSpeed - 2000;
  }

  getImageDisplayByIndex(index){
    var data = this.images.slice(index - 1,index);
    return data;
   }

  async getMultimedia()
  {
    console.log(this.demoSetting['MultimediaPriority'] + "priority")
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
              this.images.push(entry[i]);
          }
        }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  async getVideo()
  {
    this.images = [];
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
  }

  isMultimediaExist(data) : boolean{
    var isExist = false;
    if(data['MultimediaType'] == Enums.ApiSmartDisplayMultimediaType.StillImage){
      for(let i = 0 ; i < this.images.length ; i ++)
      {
        if(data['LocalPath'] === this.images[i]['LocalPath'])
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
      for(let i = 0 ; i < this.images.length ; i ++)
      {
        if(data.nativeURL === this.images[i] )
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

  playVideo()
  {
    setTimeout(() => {
      var video = document.getElementsByTagName('video')[0];
      console.log(this.videosPlayed);
      if(this.videosPlayed < this.videos.length)
      {
        var originpath = this.videos[this.videosPlayed]['Path'];
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
              this.apiSmartDisplayModel.reDownloadMultimedia(path,name,Enums.ApiSmartDisplayMultimediaType.VCD,originpath);

          } 
          // this.getImage()
          // .then(()=>console.log('Succes'))
          // .catch(err=>console.log(err));
        });
        console.log(this.videos[this.videosPlayed]);
        this.videosPlayed ++;
      }
      else
      {
       this.videosPlayed = 0;
       this.getImage();
       this.imageElements();
      }
    }, 500);
  }

  

  addInnerHtmlVideo()
  {
    this.innerHtmlVideoPlayer = "<video id ='VideoPlayer' class='video-player' (ended) = 'playVideo()'></video>"
  }

  getDataCurrency()
  {
    this.fixedRow = this.demoSetting['TabularMaxFixedRow'];
    this.dynamicRow = this.demoSetting['TabularMaxDynamicRow'];
    this.localStorage.getDataCurrency()
    .then(result =>
    {
      for(let i = 0; i< this.fixedRow ; i++)
      {
        this.createFixedRow(result[i]);
        console.log(this.fixedCurrency);
      }
      if(this.dynamicRow != null)
        this.createDynamicRow(result);
    })
    .catch(
      err => {console.error(err);
    });
  }


  innerHtml()
  {
    this.fixedColumn = this.helper.getTabularColumnCount(this.sdPlayerConfig['LayoutTemplate']);//this.demoSetting['TabularMaxColumn'];
    var numb = 2;
    //this.column = "<ion-col>Currency</ion-col>";
    for(let i = 0 ; i < this.fixedColumn ; i++)
    {
      if(numb % 2 === 0)
      {
        this.column.push(this.buyRes);
        numb = 1;
        this.buyCount++;
      }
      else{
        this.column.push(this.sellRes);
        numb = 2;
        this.sellCount++;
      }
    }
    //var inner = column;
  }

  createFixedRow(data)
  {
    var dataColumn = [];
    
    //dataColumn.push("assets/logo/american.png");
    dataColumn.push(data.FlagImage[0]);
    dataColumn.push(data.Currency[0]+ " " + data.Symbol[0]);
    //dataColumn.push(data.Symbol[0]);
    if(this.buyCount === this.sellCount)
    {
      for(let i = 0 ; i < this.buyCount; i++)
      {
        dataColumn.push(data.Buy[i]);
        dataColumn.push(data.Sell[i]);
      }
    }
    else{
      for(let i = 0 ; i < this.buyCount; i++)
      {
        dataColumn.push(data.Buy[i]);
        if(i <= this.sellCount - 1)
          dataColumn.push(data.Sell[i]);
      }
    }
    
    this.fixedCurrency.push(dataColumn);

    console.log(this.fixedCurrency);
  }

  createDynamicRow(datas)
  {
    var reset = false;
    var dynamicRow = this.fixedRow;
    var maxDynamicRow = dynamicRow + this.dynamicRow;
    this.getDynamicRow(dynamicRow, maxDynamicRow, datas)
    this.intervalTable =  setInterval(() =>
    {
      if(reset)
      {
        //console.log("here");
        dynamicRow = this.fixedRow;
        maxDynamicRow = dynamicRow + this.dynamicRow;
        this.emptyDataDynamicRow = 0;
        this.getDynamicRow(dynamicRow, maxDynamicRow, datas)
        reset = false;
      }
      else{

        if(maxDynamicRow + this.dynamicRow < datas.length)
        {
          dynamicRow += this.dynamicRow;
          maxDynamicRow += this.dynamicRow;
          this.emptyDataDynamicRow = 0;
          this.getDynamicRow(dynamicRow, maxDynamicRow, datas)
        }
        else
        {
          dynamicRow += this.dynamicRow;
          maxDynamicRow = datas.length;
          this.emptyDataDynamicRow = this.dynamicRow - (datas.length - dynamicRow);
          this.getDynamicRow(dynamicRow, maxDynamicRow, datas)
          
          reset = true;
        }
      }
      //setTimeout(() => {
        this.dynamicRowHeight()
      //}, null);
    }, 5000);
    
  }

  getDynamicRow(dynamicRow, maxDynamicRow, datas)
  {
    
    //console.log(this.emptyDataDynamicRow);
    var dataColumn = [];
    dataColumn = [];
    this.dynamicCurrency = [];
    for(let row = dynamicRow; row < maxDynamicRow ; row ++)
    {
      var data = datas[row];
      //console.log(data);
      
      //dataColumn.push("assets/logo/american.png");
      dataColumn.push(data.FlagImage[0]);
      dataColumn.push(data.Currency[0]+ " " + data.Symbol[0]) ;
      //dataColumn.push(data.Symbol[0]);
      if(this.buyCount === this.sellCount)
      {
        for(let i = 0 ; i < this.buyCount; i++)
        {
          dataColumn.push(data.Buy[i]);
          dataColumn.push(data.Sell[i]);
        }
      }
      else{
        for(let i = 0 ; i < this.buyCount; i++)
        {
          dataColumn.push(data.Buy[i]);
          if(i <= this.sellCount - 1)
            dataColumn.push(data.Sell[i]);
        }
      }
      this.dynamicCurrency.push(dataColumn);
      dataColumn = [];
      //console.log(this.dynamicCurrency);
    }

    if(this.emptyDataDynamicRow > 0)
    {
      for(let i = 0 ; i < this.emptyDataDynamicRow ; i++ )
      {
        dataColumn.push(" ");
        dataColumn.push("-");
      //dataColumn.push(data.FlagImage[0]);
      //dataColumn.push(data.Symbol[0]);
      if(this.buyCount === this.sellCount)
      {
        for(let i = 0 ; i < this.buyCount; i++)
        {
          dataColumn.push("-");
          dataColumn.push("-");
        }
      }
      else{
        for(let i = 0 ; i < this.buyCount; i++)
        {
          dataColumn.push("-");
          if(i <= this.sellCount - 1)
            dataColumn.push("-");
        }
      }
      this.dynamicCurrency.push(dataColumn);
      console.log(this.dynamicCurrency);
      dataColumn = [];
      }
    }
    
  }

  async UseTicker()
  {
    if(this.demoSetting['UseTicker'] === Enums.YesNoEnum.Yes)
    {
      console.log("use ticker");
      this.isUseTicker = true;
      await this.getXML();
      this.scrollingTextElement();
      this.tickerHeight = 50;
    }
    else
    {
      this.isUseTicker = false;
      this.runningTicker = "";
    }
  }

  async getXML()
  {
    this.ticker = await this.localStorage.getDataLocalXml();
    for(let i = 0 ; i < this.ticker.length; i++)
    {
      //this.runningTicker += "<img class = "+"imgRunning"+" src = "+"assets/logo/murni.png"+"> <div class ="+"text"+">" + this.ticker[i].Text[0] + "</div> ";
      //this.runningTicker += "<img src = "+"assets/logo/murni.png"+"> " + this.ticker[i].Text[0] + "";
      
      this.runningTickers.push(this.ticker[i].Text[0]);
    }
  }

  scrollingTextElement() 
  {
     setTimeout(() => {
      var height = this.platform.height();
      console.log(height);
      this.renderer.setElementStyle(this.scrollingText.nativeElement
        , 'top' , 'calc('+height+'px - 50px)'); //-290px
    
      // var scrollTextHeight = height - this.tickerElementHeight;
      // document.getElementById("infoScrollText").style.height = scrollTextHeight.toString() + "px";
     }, 1500);
  }

  gridElement()
  {
    setTimeout(() => {
      this.getElement();
      var infoGridParent = document.getElementById("infoGridParent");
      if(this.isUseMulmed)
      {
        infoGridParent.style.width = "50%";
        if(this.images.length > 0)
        {
          this.imageElements();
        }

        if(this.videos.length > 0)
        {
          this.videoElements();
        }
      }
      else
      {
        infoGridParent.style.width = "100%";
      }
      console.log(this.platform.height()+ "outerheight")
      var infoGridParentHeight =  this.platform.height()
      - this.headerElementHeight
      - this.dateInfoElementHeight
      - this.tickerHeight;
      console.log(this.tickerHeight + "tickerHeight");
      infoGridParent.style.height = infoGridParentHeight + "px";
      var infoGridheigt = infoGridParentHeight - this.footerElementHeight;
      document.getElementById("infoGrid").style.height = infoGridheigt + "px";
      this.singleRowHeight = infoGridheigt / (this.demoSetting['TabularMaxFixedRow'] + this.demoSetting['TabularMaxDynamicRow'] + 1);
      
      
      // //header
      // console.log(document.getElementById("header0"));
      // document.getElementById("header0").style.height = this.singleRowHeight + "px";
      
      // //fixedCurrency
      // for(let i = 0 ; i < this.fixedCurrency.length ; i++)
      // {
      //   document.getElementById("fixed" + i).style.height = this.singleRowHeight + "px";
      // }
      //dynamicCurrency
      //this.dynamicRowHeight();
    }, 1500);

  }

  dynamicRowHeight()
  {
    for(let i = 0 ; i < this.dynamicCurrency.length ; i++)
      {
        document.getElementById("dynamic" + i).style.height = "auto";
        //console.log(document.getElementById("dynamic" + i));
      }
  }

  imageElements()
  { 
    
    setTimeout(() => {
      //this.getElement();
      var imageheight = this.platform.height()
        - this.headerElementHeight
        - this.dateInfoElementHeight
        - this.tickerHeight;
      // console.log(window.outerHeight + " infoImage")
      // console.log(this.headerElementHeight + " infoImage")
      // console.log(this.dateInfoElementHeight + " infoImage")
      // console.log(this.gridElementHeight + " infoImage")
      // console.log(this.footerElementHeight + " infoImage")

      document.getElementById("infoImage").style.height = imageheight + "px";
      document.getElementById("infoImage").style.width = (window.outerWidth / 2) + "px";
    },200);
  }

  
  videoElements()
  {
    
    setTimeout(() => {
      //this.getElement();
      var infoVideo = document.getElementById("infoVideo");
      var imageheight = this.platform.height()
        - this.headerElementHeight
        - this.dateInfoElementHeight
        - this.tickerHeight; 
      //console.log(imageheight + " infoVideo")
      infoVideo.style.height = imageheight + "px";
      infoVideo.style.width = "50%";
    },200);

  }
  
  
  hideUnhideButton()
  {
    this.isButtonHide = this.isButtonHide ? false : true;
  }

  getElement()
  {
    var header = document.getElementById("infoHeader");
    var date = document.getElementById("infoDate");
    var grid = document.getElementById("infoGrid");
    var footer = document.getElementById("infoFooter");
    this.headerElementHeight = header.offsetHeight;
    this.dateInfoElementHeight = date.offsetHeight;
    //this.gridElementHeight = (grid.offsetHeight) + (grid.offsetHeight*this.fixedRow);
    this.gridElementHeight = grid.offsetHeight;
    this.footerElementHeight = footer.offsetHeight;
  }
  
  displayPictures()
  {
    this.navCtrl.setRoot(DisplayimagevideoPage);
  }

  displayVideos()
  {
    this.navCtrl.setRoot(DisplayimagevideoPage);
  }

}
