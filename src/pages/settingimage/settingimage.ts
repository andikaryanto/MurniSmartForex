import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, ModalController } from 'ionic-angular';
import { LocalStorage } from '../../helper/gen-localstorage';
import { DemoSettingModel } from '../../models/gen-demosetting';
import { CustomToast } from '../../helper/gen-toast';
import { Config } from '../../helper/gen-config';
import { Resource } from '../../helper/gen-resources';
import { SettingimagechoosePage } from '../settingimagechoose/settingimagechoose';
import { SettingimagemodalPage } from '../settingimagemodal/settingimagemodal';

/**
 * Generated class for the SettingimagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingimage',
  templateUrl: 'settingimage.html',
})
export class SettingimagePage {

  @ViewChild('headerElement') headerElement: any;
  @ViewChild('cardFolderElement') cardFolderElement: any;
  @ViewChild('cardContentElement') cardContentElement: any;
  @ViewChild('cardContentHeaderElement') cardContentHeaderElement: any;
  @ViewChild('cardContentScrollElement') cardContentScrollElement: any;

  /**HTML Resources */
  imagesSettingRes = "";
  imagesRes = "";


  screenHeight = 0;
  headerHeight = 0;
  cardFolderHeight = 0;

  private startIndex = 0;
  private endIndex = 23;
  private endAdding = 24;
  private countImage = 0;
  private countGetImage = 0;
  private imagesGallery = [];

  private images = [] ;
  private loadedImage = [] ;
  private removedImage = [];
  

  // imageSettingModel = {
  //   folderName: ''
  // };

  // private footerState: IonPullUpFooterState;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer : Renderer,
              private platform : Platform,
              private localStorage : LocalStorage,
              public events: Events,
              private demoSettingModel : DemoSettingModel,
              private toast : CustomToast,
              private config : Config,
              private resources : Resource,
              private modalCtrl : ModalController) {
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
    this.imagesSettingRes = this.resources.ImageSettingRes();
    this.imagesRes = this.resources.ImageRes();
  }

  init()
  {
    //if(this.navParams.get("folderName") !== null)
    //{
      //this.imageSettingModel.folderName = this.config.imageDir();
      this.getSavedImageFolder();
    //}
    this.events.subscribe('selectedImage', selectedImage => {
      this.imageAfterPop(selectedImage);
    });
    
  }

  destroyDataWhileLeavePage()
  {
    this.imagesGallery = [];
    this.images = [];
  }

  ionViewDidEnter()
  {
    //  this.images = this.imageAfterPop;
    //  console.log(this.imageAfterPop);
    //  console.log(this.images);
  }

  async getSavedImageFolder()
  {
    // if(this.imageSettingModel.folderName !== null || this.imageSettingModel.folderName !== undefined)
    // {
      let entry : any = await this.localStorage.getGalleryToDisplay(this.config.imageDir());//(this.imageSettingModel.folderName);
      //this.images = await this.localStorage.getGalleryToDisplay(this.imageSettingModel.folderName);
      for(let i = 0 ; i < entry.length ; i ++)
      //for(let i = 0 ; i < this.images.length ; i ++)
      {
        if(!entry[i].isDirectory)
        //if(!this.images[i].isDirectory)
        {
          //if(!this.isExistImage(entry[i]))
          //{
            //this.localStorage.getBase64(entry[i].nativeURL);
            this.images.push({
                id : null,
                photoURL : entry[i].nativeURL,
                thumbnailURL : await this.localStorage.createThumbnail(entry[i].nativeURL),
                //thumbnailURL : await this.localStorage.createThumbnail(entry[i].nativeURL),
                customThumbnail : null,// await this.localStorage.createThumbnail(entry[i].nativeURL),
                photoPath : entry[i].nativeURL.substring(this.config.getPlatformFileSystem(this.platform).length),
                fileName : entry[i].name,
                width : null,
                height : null,
                creationDate : null,
                latitude : null,
                longitude : null,
                albumIds : null,
                originalPhotoPath : entry[i].nativeURL
            });
          //}
        }
      }
      //console.log(this.images);
      // setTimeout(() => {
      //   this.loadImage();
      // }, 3000);
    //}
  }

  async loadImage()
  {
    for(let i = 0; i < this.images.length; i++)
    {
      var image = document.getElementById("image" + this.images[i].name);
      image.setAttribute("src",  await this.localStorage.createThumbnail(this.images[i].nativeURL));//await this.localStorage.createThumbnail(this.config.getPlatformFileSystem(this.platform) + data[i].id.split(";")[1]));}
    }
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
    //this.renderer.setElementClass(imageElement.classList, "selected", true);
  }

  addtoRemoveImage(fileName)
  {
    var selectedImage = this.images.find(q => q.fileName === fileName);
    if(!this.isExistInRemoveImage(selectedImage))
    {
      this.removedImage.push({
        id : selectedImage.id,
        photoURL : selectedImage.photoURL,
        thumbnailURL : selectedImage.thumbnailURL,
        photoPath : selectedImage.photoPath,
        //customThumbnail : this.localStorage.createThumbnail(selectedImage.photoURL),
        // photoURL : data[i].imageURL,
        // thumbnailURL : data[i].thumbnailURL,
        fileName : selectedImage.fileName,
        width : selectedImage.width,
        height : selectedImage.height,
        creationDate : selectedImage.creationDate,
        latitude : selectedImage.latitude,
        longitude : selectedImage.longitude,
        albumIds : selectedImage.albumIds
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
        }
      }
    }
  }

  async imageAfterPop(selectedImage)
  {
    for(let i = 0; i < selectedImage.length ; i++)
    {
      if(!this.isExistImage(selectedImage[i]))
      {
        this.images.push({
            id : selectedImage[i].id,
            photoURL : selectedImage[i].photoURL,
            thumbnailURL : await this.localStorage.createThumbnail(this.config.getPlatformFileSystem(this.platform) + selectedImage[i].id.split(";")[1]),
            customThumbnail : selectedImage[i].customThumbnail,//await this.localStorage.createThumbnail(this.config.getPlatformFileSystem(this.platform) + selectedImage[i].id.split(";")[1]),
            photoPath : selectedImage[i].photoPath,
            fileName : selectedImage[i].fileName,
            width : selectedImage[i].width,
            height : selectedImage[i].height,
            creationDate :selectedImage[i].creationDate,
            latitude : selectedImage[i].latitude,
            longitude : selectedImage[i].longitude,
            albumIds : selectedImage[i].albumIds,
            originalPhotoPath : this.config.getPlatformFileSystem(this.platform) + selectedImage[i].photoPath
        })
      }
    }
    //console.log("mueheheheheh");
  }

  setElement()
  {

    //this.renderer2.addClass()
    var cardContentElementHeight = window.outerHeight - 20 - this.headerHeight;// - this.cardFolderElement;
    //this.cardContentElement.nativeElement.offsetHeight = cardContentElementHeight;
    // this.renderer.setElementStyle(this.cardContentElement.nativeElement, 'height'
    //     , cardContentElementHeight.toString() +'px');
    //console.log(cardContentElementHeight);

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

  isExistImage(data) : boolean
  {
    var exist = false;
    var result = this.images.find(q => q.fileName === data.fileName);
    if(result !== undefined)
      exist = true;
    return exist;
  }

  toImageChoose() 
  {
    // var callBack = function(_params)  {
    //   return new Promise((resolve, reject) => {
    //           resolve();
    //       });
    // } 

    this.navCtrl.push(SettingimagechoosePage);//, {passedMethod : this.imageChoose});
  }

  removeImage()
  {
    for(let i = 0 ; i < this.removedImage.length ; i ++)
    {
     
      if(this.removedImage[i].id === null)
        this.localStorage.removeImage(this.config.getPlatformFileSystem(this.platform) + this.getPath(this.removedImage[i].photoPath), this.removedImage[i].fileName);
    
      this.findDataIndex(this.removedImage[i], index =>
      {
        this.images.splice(index, 1);
      });
    }
    this.removedImage = [];
    //this.images = []
    //this.getSavedImageFolder();
  }

  imageChoose(param) //: Promise<any[]>
  {
    //return new Promise((resolve, reject) => {
        this.images = param;
        //this.imageAfterPop(param);
        console.log(this.images);
    //})
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

  async save()
  {
    try
    {
      // await this.localStorage.createFolder(this.imageSettingModel.folderName)
      // .then(data =>
      // {
        for(let i = 0 ; i < this.images.length; i++)
        {
          // var oldpath;
          // if(this.images[i].photoPath === null)
          //   oldpath = this.images[i].photoUrl;
          // else
          //   oldpath = this.config.getPlatformFileSystem(this.platform) +  this.getPath(this.images[i].photoPath);

          if(this.images[i].id !== null)
          {
            this.localStorage.saveData(this.config.getPlatformFileSystem(this.platform) +  this.getPath(this.images[i].photoPath), 
                                      this.images[i].fileName.toString(), 
                                      this.config.imageDir(), 
                                      this.images[i].fileName.toString()
                                    );
          }
        }          
        //this.demoSettingModel.updateDemoSettingColumn("ImageFolder", this.imageSettingModel.folderName);
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

  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
    
  }

  toggleFooter() {
    // this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  openModal(index){
    let modal = this.modalCtrl.create(SettingimagemodalPage, { photo_index: index, images : this.images });
		modal.present();
  }

}
