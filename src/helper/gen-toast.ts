import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class CustomToast
{

    constructor(private toastCtrl : ToastController)
    {

    }

    showToast(message)
    {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2500,
            position: 'bottom',
            //showCloseButton : true
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
    }
}