import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Config } from '../../helper/gen-config';
import { LocalStorage } from '../../helper/gen-localstorage';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { Platform } from 'ionic-angular/platform/platform';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Resource } from '../../helper/gen-resources';
import { SmartDisplayPlayerConfigurationModel } from '../../models/gen-smartdisplayplayercofiguration';
import { SmartDisplayCustomerInfoModel } from '../../models/gen-smartdisplaycustomerinfo';
import { ApiSmartDisplayModel } from '../../models/api-smartdisplay';
import { Helper } from '../../helper/helper';
import { MultimediaModel } from '../../models/gen-multimedia';
import * as Enums from '../../enum/enums';
import * as errorMessage from '../../resources/errorMessage'
import { DisplayimagevideoPage } from '../displayimagevideo/displayimagevideo';

/**
 * Generated class for the DisplaytabularpotraitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-displaytabularpotrait',
  templateUrl: 'displaytabularpotrait.html',
})
export class DisplaytabularpotraitPage {

  @ViewChild('mVideoPlayer') mVideoPlayer: ElementRef;
  @ViewChild('scrollingText') scrollingText: ElementRef;
  // @ViewChild('imageElement') imageElement: ElementRef;
  // @ViewChild('videoElement') videoElement: ElementRef;
  // @ViewChild('headerElement') headerElement: ElementRef;
  // @ViewChild('dateInfoElement') dateInfoElement: ElementRef;
  // @ViewChild('gridElement') gridElement: ElementRef;
  // @ViewChild('footerElement') footerElement: ElementRef;
  // @ViewChild('tickerElement') tickerElement: ElementRef;
  @ViewChild(Slides) slides:Slides;

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
  isUseMulmed = false;
  isUseTicker = false;
  isButtonHide = true;
  isImmersive = false;
  column = [];
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

  innerHtmlVideoPlayer = "";
  runningTicker ="";
  footerText = "";
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
              private androidFullScreen : AndroidFullScreen,
              private screenOrientation : ScreenOrientation,
              private resource : Resource,
              private smartDisplayPlayerConfigurationModel : SmartDisplayPlayerConfigurationModel,
              private smartDisplayCustomerInfoModel : SmartDisplayCustomerInfoModel,
              private apiSmartDisplayModel : ApiSmartDisplayModel,
              private helper : Helper,
              private multimediaModel : MultimediaModel) {
                this.htmlResources();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemotabularwithoutmultimediaPage');
    this.initApi()
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
    this.demoSetting =  await this.demoSettings.getDemoSetting();
    this.infoCustomer = await this.smartDisplayCustomerInfoModel.getSmartDisplayCustomerInfo();
    this.sdPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();
   

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
      await this.getDataMultimediaApi();
    }
    //await this.UseTicker();
    //this.gridElement();
  }

  async getDataMultimediaApi(){
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
          });
        }
      }
    }, 1000);
    await this.getMultimedia();
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
      })
      .catch(err => {
      });
    }
  }

  async init()
  {
    this.demoSetting =  await this.demoSettings.getDemoSetting();
    this.sdPlayerConfig = await this.smartDisplayPlayerConfigurationModel.getSmartDisplayPlayerConfiguration();

    var Dates = new Date();
    var Day = await this.config.getDay(Dates.getDay());
    var DateInt = Dates.getDate();
    var Month = await this.config.getMonth(Dates.getMonth() + 1);
    var Year = Dates.getFullYear().toString();
    this.myDate = "Date : "+ Day +", "+DateInt +" "+ Month+" " + Year;

    this.intervalTime = setInterval(() =>
      {
        var Dates = new Date();
        var Hour = Dates.getHours().toString();
        var Minute = "0" + Dates.getMinutes().toString();
        Minute = Minute.substr(Minute.length - 2, 2);
        var Second = "0" +Dates.getSeconds();
        Second = Second.substr(Second.length - 2, 2);
        this.myTime = "Time : " + Hour +": " +Minute+": "+ Second; 
      }, 1000
    )

    this.footerText = this.demoSetting['TabularFooterText'];
    this.fullScreen();
    
    this.innerHtml();
    this.getDataCurrency();
    if(this.sdPlayerConfig['LayoutContain'] == Enums.LayoutContain.TabularInformationand1per3Multimedia)
    {
      this.isUseMulmed = true;
      await this.getMultimedia();
    }
    //await this.UseTicker();
    // if(this.demoSetting['TabularMulmedType'] === 1)
    // {
    //   this.imageElements();
    // }
    // else
    // {
    //   this.videoElements();
    // }
    
    //this.removeDivNothing();
    //this.createFixedRow();
  }

  fullScreen()
  {
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => {
      if(!this.isImmersive)
      { 
        this.androidFullScreen.immersiveMode();
        this.isImmersive = true;
      }
      else
      {
        this.androidFullScreen.showSystemUI();
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
    if(this.demoSetting['MultimediaPriority'] ===  Enums.MultimediType.Image)
    {
      this.getImage()
      .then(_ => {
        this.imageElements();
      })
      .catch(err => {
        console.error(err);
      });
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
    var video = document.getElementsByTagName('video')[0];
    //video.hidden = false;
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
      // this.videosPlayed ++;
      this.getImage();
    }
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
      }
      if(this.dynamicRow != null)
        this.createDynamicRow(result);
    })
    .catch(err => {console.error(err);});
  }

  innerHtml()
  {
    this.fixedColumn = this.fixedColumn = this.helper.getTabularColumnCount(this.sdPlayerConfig['LayoutTemplate']);//this.demoSetting['TabularMaxColumn'];
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
      //console.log(this.column);
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
    }, 5000 );
  }

  getDynamicRow(dynamicRow, maxDynamicRow, datas)
  {
    var dataColumn = [];
    dataColumn = [];
    this.dynamicCurrency = [];
    for(let row = dynamicRow; row < maxDynamicRow ; row ++)
    {
      var data = datas[row];
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
    }

    if(this.emptyDataDynamicRow > 0)
    {
      for(let i = 0 ; i < this.emptyDataDynamicRow ; i++ )
      {
        dataColumn.push(" ");
        dataColumn.push(" ");
      //dataColumn.push(data.FlagImage[0]);
      //dataColumn.push(data.Symbol[0]);
      if(this.buyCount === this.sellCount)
      {
        for(let i = 0 ; i < this.buyCount; i++)
        {
          dataColumn.push(" ");
          dataColumn.push(" ");
        }
      }
      else{
        for(let i = 0 ; i < this.buyCount; i++)
        {
          dataColumn.push(" ");
          if(i <= this.sellCount - 1)
            dataColumn.push(" ");
        }
      }
      this.dynamicCurrency.push(dataColumn);
      dataColumn = [];
      }
    }

  }

  async UseTicker()
  {
    if(this.demoSetting['UseTicker'] === Enums.YesNoEnum.Yes)
    {
      this.isUseTicker = true;
      await this.getXML();
      this.scrollingTextElement();
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
      var height = this.platform.height().toString();
      this.renderer.setElementStyle(this.scrollingText.nativeElement
        , 'top' , 'calc('+height+'px - 50px)'); //-290px
    }, 1500);
     
  }

  imageElements()
  { 
    var tickerheight = 0;
    if(this.isUseTicker)
      tickerheight = 50;
      
    var imageheight = 0;
    setTimeout(() => {
      this.getElement();
      imageheight = window.outerHeight
        - this.headerElementHeight
        - this.dateInfoElementHeight
        - this.gridElementHeight
        - this.footerElementHeight
        - tickerheight;
    },200);
    document.getElementById("infoImage").style.height = imageheight.toString() + "px";
  }

  
  videoElements()
  {
    var tickerheight = 0;
    if(this.isUseTicker)
      tickerheight = 50;

    setTimeout(() => {
      this.getElement();
      var imageheight = window.outerHeight
        - this.headerElementHeight
        - this.dateInfoElementHeight
        - this.gridElementHeight
        - this.footerElementHeight
        - tickerheight; 
      document.getElementById("infoVideo").style.height = imageheight.toString() + "px";
    },500);

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
