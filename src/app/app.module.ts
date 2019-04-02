import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { RegistersettingPage } from '../pages/registersetting/registersetting';
import { SftpsettingPage } from '../pages/sftpsetting/sftpsetting';
import { DisplayimagevideoPage } from '../pages/displayimagevideo/displayimagevideo';
import { DisplaytabularpotraitPage } from '../pages/displaytabularpotrait/displaytabularpotrait';
import { DisplaytabularlandscapePage } from '../pages/displaytabularlandscape/displaytabularlandscape';
import { SettingPage } from '../pages/setting/setting';
import { SettingbackupPage } from '../pages/settingbackup/settingbackup';
import { SettinggeneralPage } from '../pages/settinggeneral/settinggeneral';
import { SettingimagePage } from '../pages/settingimage/settingimage';
import { SettingimagechoosePage } from '../pages/settingimagechoose/settingimagechoose';
import { SettingtabularPage } from '../pages/settingtabular/settingtabular';
import { SettingvideoPage } from '../pages/settingvideo/settingvideo';
import { SettingvideochoosePage } from '../pages/settingvideochoose/settingvideochoose';
import { ChooselanguagePage } from '../pages/chooselanguage/chooselanguage';
import { SettingimagemodalPage } from '../pages/settingimagemodal/settingimagemodal';


//provider
import { LocalStorageProvider } from '../providers/localstorage/localstorage';
import { MUserProvider } from '../providers/m-user/m-user';
import { LoginProvider } from '../providers/login/login';
import { HomeMapProvider } from '../providers/home-map/home-map';
import { TKejadianProvider } from '../providers/t-kejadian/t-kejadian';
import { MUserprofileProvider } from '../providers/m-userprofile/m-userprofile';
import { DatabaseProvider } from '../providers/database/databases';
import { DbDemoSettingProvider } from '../providers/database/dbDemoSetting';
import { DbLanguageProvider } from '../providers/database/dbLanguage';
import { SmartdisplayProvider } from '../providers/smartdisplay/smartdisplay';
import { DbSmartDisplayParameterSettingProvider } from '../providers/database/dbSmartDisplayParameterSetting';
import { DbSmartDisplayContainSettingProvider } from '../providers/database/dbSmartDisplayContainSetting';
import { DbSmartDisplayCustomerInfoProvider } from '../providers/database/dbSmartDisplayCustomerInfo';
import { DbSmartDisplayPlayerConfigurationProvider } from '../providers/database/dbSmartDisplayPlayerConfiguration';
import { DbBackUpStatusProvider } from '../providers/database/dbBackupStatus';
import { DbRestoreStatusProvider } from '../providers/database/dbRestoreStatus';
import { DbMultimediaProvider } from '../providers/database/dbMultimedia';
import { DbSmartDisplayTickerSettingsProvider } from '../providers/database/dbSmartDisplayTickerSettings';
import { DbTickerProvider } from '../providers/database/dbTicker';
import { DbServerProvider } from '../providers/database/dbServer';
import { DbSftpProvider } from '../providers/database/dbSftp';

//model
import { MUserModel } from '../models/m-usermodel';
import { MUserProfileModel } from '../models/m-userprofilemodel';
import { HomeModel } from '../models/home';
import { DemoSettingModel } from '../models/gen-demosetting';
import { ApiSmartDisplayModel } from '../models/api-smartdisplay';
import { SmartDisplayCustomerInfoModel } from '../models/gen-smartdisplaycustomerinfo';
import { SmartDisplayContainSettingModel } from '../models/gen-smartdisplaycontainsetting';
import { SmartDisplayParameterSettingModel } from '../models/gen-smartdisplayparametersetting';
import { SmartDisplayPlayerConfigurationModel } from '../models/gen-smartdisplayplayercofiguration';
import { BackupStatusModel } from '../models/gen-backupstatus';
import { RestoreStatusModel } from '../models/gen-restorestatus';
import { MultimediaModel } from '../models/gen-multimedia';
import { SmartDisplayTickerSettingsModel } from '../models/gen-smartdisplaytickersetting';
import { TickerModel } from '../models/gen-ticker';
import { SftpModel } from '../models/gen-sftp';
import { ServerModel } from '../models/gen-server';

//helper
import { Helper } from '../helper/helper';
import { Config } from '../helper/gen-config';
import { CustomToast } from '../helper/gen-toast';
import { LanguageModel } from '../models/gen-language';
import { Resource } from '../helper/gen-resources';
import { Pages } from '../helper/gen-pages';
import { LocalStorage } from '../helper/gen-localstorage';

//plugin
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Base64 } from '@ionic-native/base64';
import { Toast } from '@ionic-native/toast';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//import { CacheService } from 'ionic-cache';
//import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { CacheModule } from "ionic-cache";
import { VideoPlayer } from '@ionic-native/video-player';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AppVersion } from '@ionic-native/app-version';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { AES256 } from '@ionic-native/aes-256';
import { Device } from '@ionic-native/device';
import { FTP } from '@ionic-native/ftp';
import { CodePush } from '@ionic-native/code-push';
import { Insomnia } from '@ionic-native/insomnia';
import { Autostart } from '@ionic-native/autostart';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { BackgroundMode } from '@ionic-native/background-mode';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChooselanguagePage,
    RegisterPage,
    AboutPage,
    RegistersettingPage,
    SftpsettingPage,
    DisplayimagevideoPage,
    DisplaytabularlandscapePage,
    DisplaytabularpotraitPage,
    SettingPage,
    SettingbackupPage,
    SettinggeneralPage,
    SettingimagePage,
    SettingimagechoosePage,
    SettingimagemodalPage,
    SettingtabularPage,
    SettingvideoPage,
    SettingvideochoosePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot({ keyPrefix: 'my-app-cache' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChooselanguagePage,
    RegisterPage,
    AboutPage,
    RegistersettingPage,
    SftpsettingPage,
    DisplayimagevideoPage,
    DisplaytabularlandscapePage,
    DisplaytabularpotraitPage,
    SettingPage,
    SettingbackupPage,
    SettinggeneralPage,
    SettingimagePage,
    SettingimagechoosePage,
    SettingimagemodalPage,
    SettingtabularPage,
    SettingvideoPage,
    SettingvideochoosePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    MUserProvider,
    LoginProvider,
    HomeMapProvider,
    TKejadianProvider,
    MUserprofileProvider,
    DatabaseProvider,
    DbDemoSettingProvider,
    DbLanguageProvider,
    DbSmartDisplayParameterSettingProvider,
    DbSmartDisplayContainSettingProvider,
    DbSmartDisplayCustomerInfoProvider,
    DbSmartDisplayPlayerConfigurationProvider,
    DbBackUpStatusProvider,
    DbRestoreStatusProvider,
    DbMultimediaProvider,
    DbServerProvider,
    SmartdisplayProvider,
    LocalStorageProvider,
    DbSftpProvider,
    DbSmartDisplayTickerSettingsProvider,
    DbTickerProvider,

    MUserModel,
    MUserProfileModel,
    HomeModel,
    DemoSettingModel,
    Config,
    CustomToast,
    LanguageModel,
    Resource,
    Pages,
    LocalStorage,
    ApiSmartDisplayModel,
    SmartDisplayCustomerInfoModel,
    SmartDisplayContainSettingModel,
    SmartDisplayParameterSettingModel,
    SmartDisplayPlayerConfigurationModel,
    SmartDisplayTickerSettingsModel,
    BackupStatusModel,
    RestoreStatusModel,
    MultimediaModel,
    ServerModel,
    SftpModel,
    TickerModel,

    Helper,

    SQLite,
    Toast,
    Camera,
    FileTransfer,
    Base64,
    File,
    PhotoLibrary,
    AndroidFullScreen,
    ScreenOrientation,
    VideoPlayer,
    //CacheService,
    UniqueDeviceID,
    AppVersion,
    SQLitePorter,
    AES256,
    Device,
    FTP,
    CodePush,
    Insomnia,
    Autostart,
    OpenNativeSettings,
    BackgroundMode
    
  ]
})
export class AppModule {}
