import { Injectable } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";

@Injectable()
export class Pages
{

    constructor(
        private statusBar : StatusBar)
    {

    }

    statBar()
    {
      // let status bar overlay webview
      this.statusBar.overlaysWebView(true);
  
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#0d3883');
    }
}