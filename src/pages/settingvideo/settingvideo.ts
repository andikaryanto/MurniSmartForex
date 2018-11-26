import { Component, Renderer, ViewChild } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams, Events } from 'ionic-angular';
import { LocalStorage } from '../../helper/gen-localstorage';
import { DomSanitizer } from '@angular/platform-browser';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { CustomToast } from '../../helper/gen-toast';
import { Config } from '../../helper/gen-config';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
import { Resource } from '../../helper/gen-resources';

/**
 * Generated class for the SettingvideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingvideo',
  templateUrl: 'settingvideo.html',
})
export class SettingvideoPage {
  @ViewChild('headerElement') headerElement: any;
  @ViewChild('cardFolderElement') cardFolderElement: any;
  @ViewChild('cardContentElement') cardContentElement: any;

  /** HTML Resource */
  videosSettingRes = "";
  videosRes = "";

  screenHeight = 0;
  headerHeight = 0;
  cardFolderHeight = 0;

  private startIndex = 0;
  private endIndex = 23;
  private endAdding = 24;
  private countImage = 0;
  private countGetImage = 0;
  private imagesGallery = [];



  private oldImages = [] ;
  private images = [] ;
  private removedImage = [];
  

  // imageSettingModel = {
  //   folderName: ''
  // };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer : Renderer,
              private platform : Platform,
              private localStorage : LocalStorage,
              private domSanitizer : DomSanitizer,
              public events: Events,
              private demoSettingModel : DemoSettingModel,
              private toast : CustomToast,
              private config : Config,
              private videoPlayer : VideoPlayer,
              private resources : Resource) {
              this.init();
              this.htmlResources();
               
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemosettingimagePage');
    this.getElement();
    this.setElement();
  }

  ionicViewWillLeave()
  {
    //this.destroyDataWhileLeavePage();
  }

  async htmlResources()
  {
    await this.resources.getLanguage();
    this.videosSettingRes = this.resources.VideoSettingRes();
    this.videosRes = this.resources.VideoRes();
  }


  async init()
  {
    // if(this.navParams.get("folderName") !== null)
    // {
      //this.imageSettingModel.folderName = this.navParams.get("folderName");
      this.getSavedImageFolder();
      this.localStorage.getVideosObserve()
      .subscribe({
        next : data => {
          console.log(data);
        }
      });
      //var data = await this.localStorage.getAllVideoFile();
     
    //}
    // this.events.subscribe('selectedImage', selectedImage => {
    //   this.imageAfterPop(selectedImage);
    // });
    
  }

  destroyDataWhileLeavePage()
  {
    this.imagesGallery = [];
    this.images = [];
    this.oldImages = [];
  }

  ionViewDidEnter()
  {
  }

  async getSavedImageFolder()
  {
    // if(this.imageSettingModel.folderName !== null || this.imageSettingModel.folderName !== undefined)
    // {
      let entry : any = await this.localStorage.getGalleryToDisplay(this.config.videoDir());
      for(let i = 0 ; i < entry.length ; i ++)
      {
        if(!entry[i].isDirectory)
        {
          if(!this.isExistImage(entry[i].name))
          {
            this.images.push({
                id : i,
                fileName : entry[i].name,
                customThumbnail : await this.localStorage.getVideoThumbnail(entry[i].nativeURL),//this.localStorage.getVideoThumbnail(this.config.getPlatformFileSystem(this.platform) + URL),
                URL : entry[i].nativeURL.substring(this.config.getPlatformFileSystem(this.platform).length)

            });
          }
        }
      }
      console.log(this.images);
    //}
  }

  setSelected(fileName)
  {
    var imageElement = document.getElementById(fileName);
    if(imageElement.classList.contains('selected'))
    {
      imageElement.removeAttribute('class');
      this.removefromRemoveImage(fileName);
    }
    else
    {
      imageElement.setAttribute('class', 'selected');
      this.addtoRemoveImage(fileName);
    }
    console.log(this.removedImage);
  }

  addtoRemoveImage(fileName)
  {
    var selectedImage = this.images.find(q => q.fileName === fileName);
    console.log(selectedImage);
    if(!this.isExistInRemoveImage(selectedImage))
    {
      this.removedImage.push({
        id : selectedImage.id,
        fileName : selectedImage.fileName,
        customThumbnail : null,
        URL : selectedImage.URL
      });
    }
  }

  removefromRemoveImage(fileName)
  {
    var selectedImage = this.images.find(q => q.fileName === fileName);
    if(this.isExistInRemoveImage(selectedImage))
    {
      for(let i = 0 ; i < this.removedImage.length; i++)
      {
        var name = this.removedImage[i].fileName;
        if(name === fileName)
        {
          this.removedImage.splice(i, 1);
          break;
        }
      }
    }
  }

  async imageAfterPop(selectedImage)
  {

    // console.log("selectedImage :" + selectedImage.length.toString());
    // console.log("selectedImage :" + this.images.length.toString());
    // for(let i = 0; i < selectedImage.length ; i++)
    // {
    //   if(!this.isExistImage(selectedImage[i]))
    //   {
    //     console.log("image not exist");
    //     this.images.push({
    //         id : selectedImage[i].id,
    //         photoURL : selectedImage[i].photoURL,
    //         thumbnailURL : selectedImage[i].thumbnailURL,
    //         customThumbnail : selectedImage[i].customThumbnail,//await this.localStorage.createThumbnail(this.config.getPlatformFileSystem(this.platform) + selectedImage[i].id.split(";")[1]),
    //         photoPath : selectedImage[i].photoPath,
    //         fileName : selectedImage[i].fileName,
    //         width : selectedImage[i].width,
    //         height : selectedImage[i].height,
    //         creationDate :selectedImage[i].creationDate,
    //         latitude : selectedImage[i].latitude,
    //         longitude : selectedImage[i].longitude,
    //         albumIds : selectedImage[i].albumIds  
    //     })
    //   }
    // }
    // console.log("mueheheheheh");
    // console.log(this.images);
  }
  setElement()
  {

    //this.renderer2.addClass()
    var cardContentElementHeight = window.outerHeight - 20 - this.headerHeight;// - this.cardFolderElement;
    //this.cardContentElement.nativeElement.offsetHeight = cardContentElementHeight;
    // this.renderer.setElementStyle(this.cardContentElement.nativeElement, 'height'
    //     , cardContentElementHeight.toString() +'px');
    console.log(cardContentElementHeight);

    document.getElementById("cardContent").style.height = cardContentElementHeight + "px";
    var cardContentScrollElementHeight = cardContentElementHeight -50;
    document.getElementById("idScroll").style.height = cardContentScrollElementHeight + "px";
    
  }

  getElement()
  {
    this.headerHeight = this.headerElement.nativeElement.offsetHeight;
    //this.cardFolderElement = this.cardFolderElement.nativeElement.offsetHeight;
  }

  isExistInRemoveImage(data) : boolean
  {
    var exist = false;
    var result = this.removedImage.find(q => q.fileName === data.fileName);
    if(result !== undefined)
      exist = true;
    return exist;
  }

  isExistImage(fileName) : boolean
  {
    var exist = false;
    var result = this.images.find(q => q.fileName === fileName);
    if(result !== undefined)
      exist = true;
    return exist;
  }

  async toVideoChoose() 
  {
    var result = await this.localStorage.getPhotoCamera();
    console.log(result);
    this.addVideo(result);
  }

  async addVideo(URL)
  {
    console.log("addVideo");
    // this.platform.ready()
    // .then(_ =>
    // {
      if(!this.isExistImage(this.getFileName(URL)))
      {
        this.images.push({
          id : null,
          fileName : this.getFileName(URL),
          customThumbnail : await this.localStorage.getVideoThumbnail(this.config.getPlatformFileSystem(this.platform) + URL),//this.localStorage.getVideoThumbnail(this.config.getPlatformFileSystem(this.platform) + URL),
          URL : URL
        })
      }
    // })
    // .catch(err => console.log(err));
  }

  removeImage()
  {
    for(let i = 0 ; i < this.removedImage.length ; i ++)
    {
      if(this.removedImage[i].id !== null)
      {
        this.localStorage.removeImage(this.config.getPlatformFileSystem(this.platform) + this.getPath(this.removedImage[i].URL), this.removedImage[i].fileName);
        //this.removedImage.splice(i, 1);
      }
      this.findDataIndex(this.removedImage[i], index =>
      {
        this.images.splice(index, 1);
      });
    }
    this.removedImage = [];
    //this.images = []
    //this.getSavedImageFolder();
  }

  findDataIndex(data, callBack)
  {
    for(let i = 0 ; i < this.images.length ; i++)
    {
      if(this.images[i].fileName === data.fileName)
      {
        callBack(i);
        break;
      }
    }
  }

  imageChoose(param) //: Promise<any[]>
  {
    //return new Promise((resolve, reject) => {
        this.images = param;
        //this.imageAfterPop(param);
        console.log(this.images);
    //})
  }

  async save()
  {
    try
    {
      // await this.localStorage.createFolder(this.imageSettingModel.folderName)
      // .then(data =>
      // {
        for(let i = 0 ; i < this.images.length; i++)
        {
            this.localStorage.saveData(this.config.getPlatformFileSystem(this.platform) +  this.getPath(this.images[i].URL), 
                                      this.images[i].fileName.toString(), 
                                     this.config.videoDir(), 
                                      this.images[i].fileName.toString()
                                    );
        }          
        //this.demoSettingModel.updateDemoSettingColumn("VideoFolder", this.imageSettingModel.folderName);
        this.toast.showToast("Setting Saved");
        this.navCtrl.pop();
      // })
      // .catch(err => {
      //   console.error(err);
      // });

    }
    catch(err)
    {
      console.error("error try");
    }
    //this.demoSettingModel.updateDemoSettingColumn("ImageFolder" , this.imageSettingModel.folderName)

  }

  playVideo(URL)  
  {
    const option : VideoOptions = 
    {
      scalingMode : 2
    } 

    this.videoPlayer.play(this.config.getPlatformFileSystem(this.platform) + URL, option).then((result) => {
      console.log(result);
      }).catch(err => {
      console.log(err);
    });
  }

  getFileName(originPath) : string
  {
    var splitedPath = originPath.split("/");
    return splitedPath[splitedPath.length - 1];
  }


  getPath(originPath : string) : string
  {
    var splitedPath = originPath.split("/");
    var mergedPath = "";

    for(let i = 1 ; i < splitedPath.length - 1 ; i++)
    {
      mergedPath += "/" + splitedPath[i];
    }
    return mergedPath;
  }

}
