import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LocalStorage } from '../../helper/gen-localstorage';
import { Resource } from '../../helper/gen-resources';
import { Config } from '../../helper/gen-config';
import { CacheService } from 'ionic-cache';

/**
 * Generated class for the SettingimagechoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingimagechoose',
  templateUrl: 'settingimagechoose.html',
})
export class SettingimagechoosePage {

  //@ViewChild('imageElement') imageElement : any;
  /**HTML Resource */
  selectedRes = "";
  chooseImageRes = "";
  /**End */

  private selectedImage : any;
  private startIndex = 0;
  private endIndex = 23;
  private endAdding = 24;
  private countImage = 0;
  private countGetImage = 0;
  private imagesGallery : any[] = [];
  private loadedCount = [];
  private imageSelected = [];
  private selectedImageCount = "";
  private passedMethod : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private localStorage : LocalStorage,
              public events: Events,
              private resource : Resource,
              private config : Config,
              private cache : CacheService
              ) {
              this.htmlResource();
              this.passedMethod = this.navParams.get("passedMethod")
  }

  ionViewDidLoad() {
    this.readImage();
    console.log('ionViewDidLoad DemosettingimagechoosePage');
  }

  async htmlResource()
  {
    await this.resource.getLanguage();
    this.selectedRes = this.resource.SelectedRes();
    this.chooseImageRes = this.resource.ChooseImageRes();
    this.selectedImageCount = this.chooseImageRes;
  }

  ionViewWillLeave()
  {
    //this.navCtrl.pop();
  }

  async readAllImage()
  {
    let data = await this.localStorage.getAllImageGallery();
    
    for(let i = 0; i < data.length ; i++)
    {
      this.loadedCount.push({id : data[i].id})
    }

    setTimeout(() => {
        this.loadImage();
      }, 3000);
  }

  async readImage(infiniteScroll?)
  {
    try 
    {
      //this.countImage = await this.localStorage.getImageGalleryCount();
      this.imagesGallery = await this.cache.getItem(this.config.chaceGalleryKey())
      //this.imagesGallery = await this.localStorage.getAllImageGallery();
      // this.countGetImage += this.imagesGallery.length;
      var length = this.imagesGallery.length; 
      for(let i = 0; i < length ; i++)
      {
          // var isExist = await this.localStorage.isFileExist(this.imagesGallery[i].photoPath)
          if(!this.isExistImage(this.loadedCount, this.imagesGallery[i]))
          {
            this.loadedCount.push({id : this.imagesGallery[i].id,
              customThumbnail : await this.localStorage.getPhotoThumbnail(this.imagesGallery[i].id)})
            // this.imagesGallery.push({
            //       id : data[i].id,
            //       photoURL : data[i].photoURL,
            //       thumbnailURL : this.imagesGallery[i].thumbnailURL,
            //       photoPath : data[i].id.toString().split(";")[1],
            //       customThumbnail : await this.localStorage.getPhotoThumbnail(this.imagesGallery[i].id)),
            //       fileName : data[i].fileName,
            //       width : data[i].width,
            //       height : data[i].height,
            //       creationDate : data[i].creationDate,
            //       latitude : data[i].latitude,
            //       longitude : data[i].longitude,
            //       albumIds : data[i].albumIds
            //   })
            }
      }

      // setTimeout(() => {
      //   this.loadImage();
      // }, 200);
      
      if(infiniteScroll)
        infiniteScroll.complete();

    }
    catch (err)
    {
      console.log(err);
    }
  }


  async loadImage()
  {
    for(let i = 0; i < this.loadedCount.length; i++)
    {
      var image = document.getElementById("image" + this.loadedCount[i].id);
      image.setAttribute("src", await this.localStorage.getPhotoThumbnail(this.loadedCount[i].id));//await this.localStorage.createThumbnail(this.config.getPlatformFileSystem(this.platform) + this.imagesGallery[i].photoPath));
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
  
          this.startIndex = this.endIndex + 1;
          this.endIndex += this.endAdding ;
          this.readImage(infiniteScroll);
        console.log('Async operation has ended');

      if(this.countGetImage === this.countImage)
        infiniteScroll.enable(false);
  }

  setSelected(imageId)
  {
    var imageElement = document.getElementById("image" + imageId);
    if(imageElement.classList.contains('selected'))
    {
      imageElement.removeAttribute('class');
      this.removeImage(imageId);
    }
    else
    {
      imageElement.setAttribute('class', 'selected');
      this.addImage(imageId);
    }
    console.log(this.imageSelected);
    this.selectedImageCount = this.imageSelected.length > 0 ? this.imageSelected.length.toString()+" " + this.selectedRes : this.chooseImageRes;
    //this.renderer.setElementClass(imageElement.classList, "selected", true);
  }

  isExistImage(images, selectedImage) : boolean
  {
    var exist = false;
    var result = images.find(q => q.fileName === selectedImage.fileName);
    if(result !== undefined)
      exist = true;
    return exist;
  }

  addImage(imageId)
  {
    var selectedImage = this.imagesGallery.find(q => q.id === imageId);
    console.log(selectedImage);
    if(!this.isExistImage(this.imageSelected, selectedImage))
    {
      this.imageSelected.push({
        id : selectedImage.id,
        photoURL : selectedImage.photoURL,
        thumbnailURL : selectedImage.thumbnailURL,
        originalPhotoURL : selectedImage.originalPhotoURL,
        originalThumbnailURL : selectedImage.originalThumbnailURL,
        photoPath : selectedImage.photoPath,
        customThumbnail : selectedImage.customThumbnail,
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

  removeImage(imageId)
  {
    var selectedImage = this.imagesGallery.find(q => q.id === imageId);
    if(this.isExistImage(this.imageSelected, selectedImage))
    {
      for(let i = 0 ; i < this.imageSelected.length; i++)
      {
        var id = this.imageSelected[i].id;
        if(id === imageId)
        {
          this.imageSelected.splice(i, 1);
        }
      }
    }
  }

  save()
  {
  //   this.passedDataImage(this.imageSelected).then(()=>{
  //     this.navCtrl.pop();
  //  });
    this.events.publish('selectedImage', this.imageSelected);
    this.navCtrl.pop();
    //this.passedMethod(this.imageSelected);

  }

}
