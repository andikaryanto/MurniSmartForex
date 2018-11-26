import { Injectable } from "@angular/core";
import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
import { DomSanitizer } from "@angular/platform-browser";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File, DirectoryEntry, FileEntry, FileWriter } from '@ionic-native/file';
import { ILocalStorage } from "../interfaces/ilocalstorage";
import { LocalStorageProvider } from "../providers/localstorage/localstorage";
import { CustomToast } from "./gen-toast";
import { Config } from "./gen-config";
import { resolve } from "url";
import { Base64 } from "@ionic-native/base64";
import { rejects } from "assert";
import { Platform } from "ionic-angular";
import { promisify } from "util";
import { flatten } from "@angular/compiler";
import { query } from "@angular/core/src/animation/dsl";
import { isCheckedProperty } from "ionic-angular/util/util";
import { jsonpFactory } from "@angular/http/src/http_module";
import { Observable } from "../../node_modules/rxjs/Observable";
import { AppVersion } from "@ionic-native/app-version";
import { FTP } from "@ionic-native/ftp";
import ssh2 from 'ssh2';
import sftp from 'ssh2-sftp-client';
import { SftpModel } from "../models/gen-sftp";

declare var cordova : any;

@Injectable()
export class LocalStorage implements ILocalStorage
{
    galeryCountData = 0;
    videos = [];
    directories = [];
    isRootChecked = false;
    dirPathChecked = Array<{path : string, isChecked : boolean}>();
    dirChecked = [];
    isRootDir = false;
    fullPath="";
    prevFullPath="";
    index = 0;
    constructor(
        private photoLibrary: PhotoLibrary, 
        public domSanitizer : DomSanitizer, 
        private camera : Camera, 
        private file : File,
        private localStorageProvider : LocalStorageProvider,
        private toast : CustomToast,
        private config : Config,
        private base64 : Base64,
        private platform : Platform,
        private appVersion : AppVersion,
        private ftp : FTP,
        private sftpModel : SftpModel)
    {

    }

    getApplicationDataDirectory(){
        return this.file.externalDataDirectory;
    }

    getApplicationDataImageDirectory(){
        return this.file.externalDataDirectory + this.config.imageDir();
    }

    getApplicationDataVideoDirectory(){
        return this.file.externalDataDirectory + this.config.videoDir();
    }

    async getDataLocalXml() 
    {
        let xmlData = await this.localStorageProvider.getXMLLocalData(this.file.externalRootDirectory +"myxml/SmartForexTicker.XML");
        //let xmlData = await this.localStorageProvider.getXMLLocalData("assets/xml/SmartForexTicker.XML");
        //console.log(xmlData);
        return xmlData['SmartForexRateAPI']['SmartForexAPIResult'][0]['SmartForexTicker'][0]['TickerInfo'];
    }

    async getDataCurrency()
    {
        //let Currency = await this.localStorageProvider.getXMLLocalData(this.file.externalRootDirectory +"myxml/Currency.xml");
        let Currency = await this.localStorageProvider.getXMLLocalData("assets/xml/Currency.xml");
        //console.log(Currency['Data']['Country']);
        return Currency['Data']['Country'];
    }

    // readFile()
    // {
    //    this.file.readAsText(this.file.externalRootDirectory + "myxml", "SmartForexTicker.XML")
    //    .then((value) =>
    //    {
    //         console.log(value);    
    //    })
    //    .catch((err) =>
    //     {
    //         console.error(err);
    //     });
    // }

    saveData(oldpath : string, oldName : string, folderName : string, newName : string)
    {
        var newPath = this.file.externalDataDirectory + folderName;
        this.file.copyFile(oldpath, oldName ,newPath, newName)
        .then(entry =>
        {
            console.log("Image Saved");
        })
        .catch(err =>
        {
            console.error("Failed Save");
        });
    }

    createNewFileName(oldName :string) : string
    {
        var splittedName = oldName.split(" ");
        var newName = "";
        for(let i = 0 ; i < splittedName.length ; i ++)
        {
            newName += splittedName[i];
        }
        return newName
    }

    removeImage(path : string, name : string)
    {

        console.log(path);
        this.file.removeFile(path, name)
        .then(_ =>
        {
            console.log( name + "removed");
        })
        .catch(err =>
        {
            console.error(err);
        });
    }

    isMultimediaImageExist() : Promise<boolean>
    {
        var exist = false;
        return new Promise((resolve, reject) =>
        {
            this.file.listDir(this.file.externalDataDirectory, this.config.imageDir())
            .then(entry => {
                console.log(entry);
                if(entry.length > 0)
                    exist = true;
                else
                    exist = false;

                resolve(exist);
            })
            .catch(err => {
                console.log("errrrrrr");
                resolve(exist);
            });
        });
    }

    isMultimediaVideoExist() : Promise<boolean>
    {
        var exist = false;
        return new Promise((resolve, reject) =>
        {
            this.file.listDir(this.file.externalDataDirectory, this.config.videoDir())
            .then(entry => {
                console.log(entry);
                if(entry.length > 0)
                    exist = true;
                else
                    exist = false;

                resolve(exist);
            })
            .catch(err => {
                console.log("errrrrrr");
                resolve(exist);
            });
        });
    }

    createMultimediaFolder()
    {
        //Video
        this.file.checkDir(this.file.externalDataDirectory , this.config.videoDir())
        .then(() =>
        {
            console.log("Dir Video Exist");
        }
        )
        .catch(err =>
        {
            this.file.createDir(this.file.externalDataDirectory,  this.config.videoDir(), false)
            .then(_ =>
            {
                console.log("Dir Image Created");
            })
            .catch(err =>
            {
                console.log(err);
            });
        })

        //Image
        this.file.checkDir(this.file.externalDataDirectory , this.config.imageDir())
        .then(() =>
        {
            console.log("Dir Image Exist");
        }
        )
        .catch(err =>
        {
            this.file.createDir(this.file.externalDataDirectory,  this.config.imageDir(), false)
            .then(_ =>
            {
                console.log("Dir Image Created");
            })
            .catch(err =>
            {
                console.log(err);
            });;
            
        })
    }

    createPathFolder(folderName : string, path : string = ""){
        this.file.checkDir(this.file.externalRootDirectory, folderName)
        .then(value => {
            
        })
        .catch(err => {
            this.file.createDir(this.file.externalRootDirectory + path, folderName, false)
            .then(_ => {
                console.log(folderName + "folder created");
            })
            .catch(err =>{
                console.error(err);
            });
        });
    }

    async createFolder(folderName : string)
    {
        var isValidCreateDir = false;
        try
        {
            //console.log("enter create folder");
            var listDIrData : any = await this.getGalleryToDisplay(folderName);
            //console.log(listDIrData.length);
            for(let i = 0 ; i < listDIrData.length ; i++ )
            {
                if(listDIrData[i].name === this.config.createdTempDir())
                {
                    isValidCreateDir = true;
                    break;
                }
            }
            //console.log("iasvalid " + isValidCreateDir)
        }
        catch(err)
        {
            isValidCreateDir = true;
            console.log(isValidCreateDir);
        }
        

        return new Promise((resolve, reject) =>
        {
            if(folderName.length > 0)
            {

                if(isValidCreateDir)
                {
                    this.file.createDir(this.file.externalRootDirectory, folderName, true)
                    .then(dirEntry =>
                    {
                        this.file.createDir(this.file.externalRootDirectory + folderName, this.config.createdTempDir(), true)
                        .then(entry =>
                        {
                            resolve(dirEntry);
                            console.log(this.file.externalRootDirectory + folderName);
                            console.log("Dir Temp Created");
                        })
                        .catch(err =>
                        {
                            this.file.removeDir(this.file.externalRootDirectory, folderName)
                            .then(_ =>
                            {
                                console.log("Create Dir Canceled")
                            })
                            .catch(err =>
                            {
                                reject(err);
                                console.error("embohhh");
                            })
                            reject(err);
                            console.error(err);
                        })
                    })
                    .catch(err =>
                    {
                        this.toast.showToast("Same Directory Exist");
                        reject(err);
                    })
                }
                else
                {
                    this.toast.showToast("Not Valid Create Temp Dir");
                }
            }
            else
            {
                this.toast.showToast("Folder name can't be empty");
                reject("Folder name can't be empty")
            }
        })
    }


    getGalleryToDisplay(folderToDisplay : string) : Promise<any[]>
    {
        if(folderToDisplay !== undefined || folderToDisplay !== null)
        {
            return new Promise((resolve, reject) =>
            {
                this.file.listDir(this.file.externalDataDirectory, folderToDisplay)
                .then(entry => {
                    //console.log(entry);
                    resolve(entry);
                })
                .catch(err => {
                    console.log("error mhaank");
                    reject(err);
                });
            });
        }
    }

    getGalleryAssetToDisplay(folderToDisplay : string) : Promise<any[]>
    {
        if(folderToDisplay !== undefined || folderToDisplay !== null)
        {
            return new Promise((resolve, reject) =>
            {
                this.file.listDir(this.file.applicationStorageDirectory,folderToDisplay)
                .then(entry => {
                    //console.log(entry);
                    resolve(entry);
                })
                .catch(err => {
                    console.log("error mhaank");
                    reject(err);
                });
            });
        }
    }


    getVideoThumbnail(URL) : Promise<string>
    {
        console.log(URL);
        return new Promise((resolve, rejects) =>
        {
            var video = document.createElement('video');
            video.src = URL;
            var canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 250;
            var returnUrl = "";
            //var img = document.createElement('img');

            video.play().then(_ =>
            {
                setTimeout(() =>
                {
                    video.pause();
                }, 10)
            });

            video.addEventListener('play', function () {
                canvas.style.display = 'none';
                //img.style.display = 'none';
            }, false);
            video.addEventListener('pause', function () {
                canvas.style.display = 'block';
                //img.style.display = 'block';
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                var dataURL = canvas.toDataURL('image/jpeg', 1);
                //img.setAttribute('src', dataURL);
                resolve(dataURL);

            }, false);

        })
        
        //return returnUrl;
    }

    //create tumbnail
    createThumbnail(URL) : Promise<string>{
        // var thumbnail = "";
        // var bigImage = await this.encodeImage(Url);
        
        return new Promise((resolve, reject) =>
        {
                this.generateFromImage(URL, 200, 200, 1, data => {
                    //console.log(data);
                    resolve(data);
                });
                
        });
    }

    generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) : string{
        var canvas: any = document.createElement("canvas");
        var image = new Image();
        var dataUrl = "";
        image.onload = () => {
            var width = image.width;
            var height = image.height;
        
            if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
            } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
        
            ctx.drawImage(image, 0, 0, width, height);
        
            // IMPORTANT: 'jpeg' NOT 'jpg'
            dataUrl = canvas.toDataURL('image/jpeg', quality);
        
            callback(dataUrl)
        }
        image.src = img;
        return dataUrl;
        //callback(image)
    }

    getImageSize(data_url) {
        var head = 'data:image/jpeg;base64,';
        return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
    }

    //end createThumbnail

    getPhotoCamera()
    {
        return new Promise((resolve, reject)=> 
        {
            const options: CameraOptions = {
                quality: 100,
                destinationType: this.camera.DestinationType.FILE_URI,
                //encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.VIDEO,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            }

            this.camera.getPicture(options).then((data) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                resolve(data);
                
            }, (err) => {
                // Handle error
                reject(err);
            });
        });
    
    }

    getImageGalleryCount() : Promise<number> {
        //return this.galeryCountData;
        return new Promise((resolve, reject) =>{
            
            let count : number = 0;
            console.log("gallery should open");
            this.photoLibrary.requestAuthorization().then(() => {
                this.photoLibrary.getLibrary().subscribe(
                {
                    next: library => {
                    count = library.length;
                    resolve(count);
                    },
                    error: err => { console.log('could not get photos'); 
                        reject(err);
                    },
                    complete: () => { console.log('done getting photos'); }
                });
            })
            .catch(err => console.log('permissions weren\'t granted'));
        })    
    }

    getPhotoTumbnail(photoUrl) : Promise<Blob>
    {
        return new Promise((resolve, reject) =>{
            
            let imagesGallery = [];
            this.photoLibrary.requestAuthorization()
            .then(() => {
                this.photoLibrary.getThumbnail(photoUrl)
                .then(result =>
                {
                    resolve(result);
                })
                .catch(err =>
                {
                    reject(err);
                })
            })
            .catch(err => console.log('permissions weren\'t granted'));
        })   
    }

    getPhotoThumbnail(id) : Promise<string>
    {
        return new Promise((resolve, reject) =>{
            this.photoLibrary.getThumbnail(id)
            .then(_ =>
            {
                //resolve(_);
                // image.omnlo
                var fileReader = new FileReader();
                fileReader.readAsDataURL(_);
                fileReader.onload = () =>
                {
                    var result = fileReader.result.toString();
                    //console.log(result);
                    resolve(result)
                }
                //resolve(_);
            })
            .catch(err => { 
                
                console.error(err);
                reject(err);
            })
        })
    }

    getAllImagesGallery() : Promise<any[]>
    { 
        return new Promise((resolve, reject) =>{
            let imagesGallery = [];
            //console.log("gallery should open");
            
            this.photoLibrary.requestAuthorization()
            .then(async () => {
                imagesGallery = await this.photoLibrary.getLibrary().toPromise();
                resolve(imagesGallery);
                // console.log(library);
                // console.log("library");

                // for(let i = 0 ; i < library.length ; i++)
                // {
                //     // check if same name in different folder
                //     if(!this.isExistImage(imagesGallery, library[i]))
                //     {
                //         imagesGallery.push({
                //             id : library[i].id,
                //             photoURL : this.domSanitizer.bypassSecurityTrustUrl(library[i].photoURL),
                //             thumbnailURL :this.domSanitizer.bypassSecurityTrustUrl(library[i].thumbnailURL),
                //             originalPhotoURL : library[i].photoURL,
                //             originalThumbnailURL : library[i].thumbnailURL,
                //             //customThumbnail : await this.createThumbnail(this.config.getPlatformFileSystem(this.platform) + library[i].id.split(";")[1]),
                //             customThumbnail : await this.getPhotoThumbnail(library[i].id),
                //             photoPath : library[i].id.toString().split(";")[1],
                //             fileName : library[i].fileName,
                //             width : library[i].width,
                //             height : library[i].height,
                //             creationDate : library[i].creationDate,
                //             latitude : library[i].latitude,
                //             longitude : library[i].longitude,
                //             albumIds : library[i].albumIds
                //         })
                        
                //     }
                // }
            //console.log("imagesGallery");
            //resolve(imagesGallery);
                
            })
            .catch(err => 
            {
                console.log(err);
            })
        })
    }

    getAllImageGallery() : Promise<any[]>
    {
        return new Promise((resolve, reject) =>{
            let imagesGallery = [];
            //console.log("gallery should open");
            this.photoLibrary.requestAuthorization().then(() => {
                this.photoLibrary.getLibrary().subscribe(
                {
                    next: library => {
                        //let data = library; 
                        //console.log(data.length);
                        for(let i = 0 ; i < library.length ; i++)
                        {
                            // check if same name in different folder
                            if(!this.isExistImage(imagesGallery, library[i]))
                            {
                                imagesGallery.push({
                                    id : library[i].id,
                                    photoURL : this.domSanitizer.bypassSecurityTrustUrl(library[i].photoURL),
                                    thumbnailURL :this.domSanitizer.bypassSecurityTrustUrl(library[i].thumbnailURL),
                                    originalPhotoURL : library[i].photoURL,
                                    originalThumbnailURL : library[i].thumbnailURL,
                                    //customThumbnail : await this.createThumbnail(this.config.getPlatformFileSystem(this.platform) + library[i].id.split(";")[1]),
                                    //customThumbnail : await this.getPhotoThumbnail(library[i].id),
                                    photoPath : library[i].id.toString().split(";")[1],
                                    fileName : library[i].fileName,
                                    width : library[i].width,
                                    height : library[i].height,
                                    creationDate : library[i].creationDate,
                                    latitude : library[i].latitude,
                                    longitude : library[i].longitude,
                                    albumIds : library[i].albumIds
                                })
                                
                            }
                        }
                    resolve(imagesGallery);
                },
                error: err => { console.log('could not get photos'); 
                    reject(err);
                },
                complete: () => { console.log('done getting photos'); }
                });
            })
            .catch(err => console.log('permissions weren\'t granted'));
        })   
    }

    isExistImage(images, selectedImage) : boolean
    {
        var exist = false;
        var result = images.find(q => q.fileName === selectedImage.fileName);
        if(result !== undefined)
            exist = true;
        return exist;
    }

    isFileExist(originPath : string) : Promise<boolean> 
    {
        return new Promise((resolve, reject) => {
            var path = this.config.getPlatformFileSystem(this.platform) + this.getPath(originPath, 1);
            var name = this.getName(originPath);
            this.file.checkDir(this.config.getPlatformFileSystem(this.platform) + this.getPath(originPath, 2) +"/", this.getFolderName(originPath))
            .then(_ =>
            {
                this.file.checkFile(path + "/", name)
                .then(_ =>
                {
                    resolve(true);
                })
                .catch(err => {
                    resolve(false);
                });
            })
            .catch(err =>
            {
                resolve(false);
            })
        });
    }

    isMultimediaExist(path, name) : Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.file.checkFile(path, name)
            .then(_ => {
                resolve(true);
            })
            .catch(err => {
                resolve(false);
            })
        });
    }

    getPath(originPath : string, lessSub : number) : string
    {
      var splitedPath = originPath.split("/");
      var mergedPath = "";
      for(let i = 1 ; i < splitedPath.length - lessSub ; i++)
      {
        mergedPath += "/" + splitedPath[i];
      }
      return mergedPath;
    }

    getName(originPath : string) : string
    {
        var splitedPath = originPath.split("/");
        var name = "";
        name = splitedPath[splitedPath.length - 1]
        return name;
    }

    getFolderName(originPath : string) : string
    {
        var splitedPath = originPath.split("/");
        var name = "";
        name = splitedPath[splitedPath.length - 2]
        return name;
    }

    getImageGallery(startIndex : number , endIndex : number) : Promise<any[]>
    {
        return new Promise((resolve, reject) =>{
            
            let imagesGallery = [];
            //console.log("gallery should open");
            this.photoLibrary.requestAuthorization().then(() => {
                this.photoLibrary.getLibrary().subscribe(
                {
                    next: library => {
                        let indexEnd = 0;
                        if(endIndex > library.length)
                            indexEnd = library.length - 1;
                        else
                            indexEnd = endIndex;

                        imagesGallery = library.slice(startIndex, indexEnd + 1) ; 
                        resolve(imagesGallery);
                    },
                    error: err => { console.log('could not get photos'); 
                        reject(err);
                    },
                    complete: () => { console.log('done getting photos'); }
                });
            })
            .catch(err => console.log('permissions weren\'t granted'));
        })    
  }

  encodeImage(imgUrl) : Promise<string>
  {
    return new Promise((resolve, reject) =>
    {
        this.base64.encodeFile(imgUrl)
        .then((base64File: string) => {
            resolve(base64File);
        })
        .catch((e) =>
        {
          reject(e);
        });
    })
    
  }

  async testDir(){
    console.log("/MIUI/".split("/").length); 
    this.getVideosObserve
    // var a = await this.file.listDir(this.file.externalRootDirectory , this.createDirPath("/MIUI/debug_log/common/com.xiaomi.finddevice/process-com.xiaomi.finddevice:normal/"));
    // console.log(a);
  }

  getVideosObserve(){
    return new Observable((observer) =>{
        console.log(this.fullPath + "asw");
        this.file.listDir(this.file.externalRootDirectory, this.fullPath)
        .then(files => {
            for(var i = this.index; i < files.length; i++){
                console.log(files[i]);
                if(files[i].isDirectory){
                    console.log(this.fullPath);
                    if(this.containColon(files[i].name) || this.fullPath == "/Android/"){
                        var existed = this.dirPathChecked.find(q => q.path == files[i].fullPath);
                        if(existed == undefined){
                            this.dirPathChecked.push({path : files[i].fullPath, isChecked : true});
                        }
                    }

                    var existed = this.dirPathChecked.find(q => q.path == files[i].fullPath);
                    if(existed != undefined)
                    {
                        if(i == files.length - 1){
                            this.dirPathChecked.push({path : this.fullPath, isChecked : true});
                            if(this.fullPath.split("/").length > 3){
                                var arrFullPath = this.fullPath.split("/");
                                var parentPath = "";
                                for(var arrI = 0 ; arrI < arrFullPath.length - 2; arrI ++){
                                    parentPath += arrFullPath[arrI] + "/";
                                }
                                this.fullPath = parentPath;
                                return this.getVideosObserve();
                            }
                            else{
                                if(this.index == files.length - 1){
                                    return ;
                                }
                                else{
                                    this.index++;
                                    this.fullPath = files[this.index].fullPath;
                                    return this.getVideosObserve();
                                }
                            }
                        }

                        continue;
                    }
                    this.fullPath = files[i].fullPath;
                    return this.getVideosObserve();
                }
                else{
                    if(files[i].isFile && (
                        this.getExtentionOfName(files[i].name) == "mp4" || 
                        this.getExtentionOfName(files[i].name) == "mkv" || 
                        this.getExtentionOfName(files[i].name) == "gif" )
                    ){
                        var existInVideo = this.videos.find(q => q.fullPath + q.name == files[i].fullPath + files[i].name);
                        if(!existInVideo){
                            this.videos.push(files[i]);
                            observer.next(files[i]);
                        }
                    }
                }
            }
        });
    })

    
  }

  async getAllVideoFile(){

    if(!this.isRootChecked){
        var files = await this.file.listDir(this.file.externalRootDirectory,"");
        this.isRootChecked = true;
        
        for(var i = 0; i < files.length; i++){
            if(files[i].isFile && (
                this.getExtentionOfName(files[i].name) == "mp4" || 
                this.getExtentionOfName(files[i].name) == "mkv" || 
                this.getExtentionOfName(files[i].name) == "gif" )
            ){
                this.videos.push(files[i]);
            }

            if(files[i].isDirectory){
                this.directories.push(files[i])
            }
        }
        this.fullPath = this.directories[0].fullPath;
        console.log(this.directories.length)
    }
    console.log(this.fullPath);
    //for(var i = this.index ; i< this.directories.length; i++){
        var files = await this.file.listDir(this.file.externalRootDirectory , this.createDirPath(this.fullPath));
        if(files.length > 0)
        {
            for(var j = 0; j < files.length; j++){
                if(files[j].isDirectory)
                {
                    if(this.containColon(files[j].name) || this.fullPath == "/Android/"){
                        var existed = this.dirPathChecked.find(q => q.path == files[j].fullPath);
                        if(existed == undefined){
                            this.dirPathChecked.push({path : files[j].fullPath, isChecked : true});
                        }
                    }

                    var existed = this.dirPathChecked.find(q => q.path == files[j].fullPath);
                    if(existed != undefined)
                    {
                        //this.fullPath = this.prevFullPath;
                        
                        if(j == files.length - 1){
                            this.dirPathChecked.push({path : this.fullPath, isChecked : true});
                            if(this.fullPath.split("/").length > 3){
                                var arrFullPath = this.fullPath.split("/");
                                var parentPath = "";
                                for(var arrI = 0 ; arrI < arrFullPath.length - 2; arrI ++){
                                    parentPath += arrFullPath[arrI] + "/";
                                }
                                this.fullPath = parentPath;
                                return this.getAllVideoFile();
                            }
                            else{
                                if(this.index == this.directories.length - 1){
                                    return this.videos;
                                }
                                else{
                                    this.index++;
                                    this.fullPath = this.directories[this.index].fullPath;
                                    return this.getAllVideoFile();
                                }
                            }
                        }

                        continue;
                    }
                    //this.prevFullPath = this.fullPath;
                    this.fullPath = files[j].fullPath;
                    return this.getAllVideoFile();
                }
                else{
                    //this.prevFullPath = this.fullPath;
                    if(
                        this.getExtentionOfName(files[j].name) == "mp4" || 
                        this.getExtentionOfName(files[j].name) == "mkv" || 
                        this.getExtentionOfName(files[j].name) == "gif" 
                    ){
                        var existInVideo = this.videos.find(q => q.fullPath + q.name == files[j].fullPath + files[j].name);
                        if(!existInVideo)
                            this.videos.push(files[j]);
                    }

                    if(j == files.length - 1){
                        this.dirPathChecked.push({path: this.fullPath, isChecked :true});
                        if(this.fullPath.split("/").length > 3){
                            //creatre previous dir
                            var arrFullPath = this.fullPath.split("/");
                            var parentPath = "";
                            for(var arrI = 0 ; arrI < arrFullPath.length - 2; arrI ++){
                                parentPath += arrFullPath[arrI] + "/";
                            }
                            this.fullPath = parentPath;//this.directories[this.index].fullPath;
                            return this.getAllVideoFile();
                        }
                        else{
                            // this.index++;
                            // if(this.fullPath == "/wlan_logs/")
                            //     console.log("here");
                            // this.fullPath = this.directories[this.index].fullPath;
                            // return this.getAllFile();
                            if(this.index == this.directories.length - 1){
                                return this.videos;
                            }
                            else{
                                this.index++;
                                this.fullPath = this.directories[this.index].fullPath;
                                return this.getAllVideoFile();
                            }
                        }
                    }
                }

                
            }
        }
        else{
            this.dirPathChecked.push({path: this.fullPath, isChecked :true});
            
            if(this.fullPath.split("/").length > 3){
                var arrFullPath = this.fullPath.split("/");
                var parentPath = "";
                for(var arrI = 0 ; arrI < arrFullPath.length - 2; arrI ++){
                    parentPath += arrFullPath[arrI] + "/";
                }
                this.fullPath = parentPath;//this.directories[this.index].fullPath;
                return this.getAllVideoFile();
            }
            else{
                if(this.index == this.directories.length - 1){
                    return this.videos;
                }
                else{
                    this.index++;
                    this.fullPath = this.directories[this.index].fullPath;
                    return this.getAllVideoFile();
                }
            }
        }
    //}
    //this.isRootChecked = false;
    //console.log(this.videos);
  }

  containColon(name){
      var isContain = false;
      for(var i = 0 ; i <= name.length; i++){
          if(name.substring(name.length - i, name.length - i + 1) === ":"){
              isContain = true;
              break;
          }
      }
      return isContain;
  }

  createDirPath(path) : string {
      var newPath = path.substring(1, path.length);
      return newPath;
  }
  
  isDirectoryChecked(dirChecked, dir){
    var isExist = false;
    var exist = dirChecked.find(q => q.name == dir.name);
    console.log(exist);
    if(exist != undefined)
    {
        isExist = true;
    }
    return isExist;
  }

  getExtentionOfName(name) : string {
    var extenstion = "";
        extenstion = name.split(".");
        
    return extenstion[extenstion.length - 1];
  }

  createFile(path : string, name : string, val : string) : Promise<boolean>{
        return new Promise((resolve, reject) =>
        {
            this.file.writeFile(this.file.externalRootDirectory + path, name, val, {replace : true})
            .then(_ => {
                console.log("File Wrritten");
                resolve(true);
            })
            .catch(err => {
                console.error(err);
                resolve(false);
            })
        });
    }

    readFile(path : string, name : string): Promise<string>{
        return new Promise((resolve, reject) =>
        {
            var newPath = this.file.externalRootDirectory + path +"/";
            //console.log(newPath)
            this.file.readAsText(newPath, name)
            .then(res => {
                resolve(res);
            })
            .catch(err =>{
                console.error(err);
                reject(err);
            });
        });

    }

    isBackFileExist(path : string, name : string) : Promise<boolean>{
        return new Promise((resolve, reject) =>
        {
            var newPath = this.file.externalRootDirectory + path +"/";
            this.file.checkFile(newPath, name)
            .then(res => {
                resolve(true);
            })
            .catch(err =>{
                resolve(false);
            });
        });
    }

    downloadFromSFTP(localPath:string ,originPath : string){
        return new Observable(() => {
            var ftpData = this.config.getFTPAccount();
            this.ftp.connect(ftpData['Host'], ftpData['User'], ftpData['Password'])
            .then(() => {
                //console.log("ftp");
                //console.log("localpath", localPath);
                //console.log("originPath", originPath);
                this.ftp.download(localPath, originPath)
                .subscribe(value => {
                    return value;
                });
                
            })
            .catch(err => {
                console.error(err);
                //resolve(false);
                this.ftp.disconnect()
                .then(val => {
                    //console.log("disconnected");
                })
                .catch(err => {
                    //console.log("err disco");
                });
            });
        });
    }

    downloadFromFTP(localPath:string ,originPath : string){
        return new Promise((resolve, reject) =>
        {
            this.sftpModel.getSftp()
            .then(data => {
                this.ftp.connect(data['IpAddress'], data['Username'], data['Password'])
                .then(() => {
                    this.ftp.download(localPath, originPath)
                    .subscribe({
                        next: value => {
                            console.log(value);
                            if(value == 1){
                                resolve(true);
                                //console.log(value);
                                this.ftp.disconnect()
                                .then(val => {
                                    //console.log("disconnected");
                                })
                                .catch(err => {
                                    //console.log("err disco");
                                });
                            }
                        },
                        error: err => { console.error(err); 
                            resolve(false);
                        },
                        complete: () => { resolve(false); console.log('complete'); }
                    });
                })
                .catch(err => {
                    console.error(err);
                    resolve(false);
                    this.ftp.disconnect()
                    .then(val => {
                        resolve(false);
                        //console.log("disconnected");
                    })
                    .catch(err => {
                        resolve(false);
                        //console.log("err disco");
                    });
                });
            });
            
        });
    }

    removeData(path, fileName) : Promise<boolean>{
        return new Promise((resolve, reject) =>
        {
            this.file.checkFile(path+"/", fileName)
            .then(() => {
                this.file.removeFile(path, fileName)
                .then(() => {
                    console.log("Data removed");
                    resolve(true);
                })
                .catch(err => {
                    resolve(false);
                    console.log("error removed File");
                })
            })
            .catch(err => {
                resolve(false);
                console.log("file not exist");
            })
        });
    }
}