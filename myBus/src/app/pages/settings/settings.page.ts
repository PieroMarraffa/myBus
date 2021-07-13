import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import{ ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose your language',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Italiano',
        role: 'destructive',
        icon: 'flag',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'English',
        icon: 'flag',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

