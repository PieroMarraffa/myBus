import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from "@ionic/angular";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import{ ActionSheetController} from "@ionic/angular";
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit{

  languages = [];
  selected = '';

  constructor(private navCotroller: NavController,
              private usersService: UsersService,
              private router: Router,
              public actionSheetController: ActionSheetController,
              private translateService: TranslateService,
              private languageService: LanguageService)
  {}

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('Settings.Lingua'),
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Italiano',
        role: 'destructive',
        icon: 'flag',
        handler: () => {
          this.select('it');
        }
      }, {
        text: 'English',
        icon: 'flag',
        handler: () => {
          this.select('en');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetChangeCred() {

    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('CambioCredenziali.title'),
      cssClass: 'my-custom-class',
      buttons: [{
        text: this.translateService.instant('CambioCredenziali.User'),
        role: 'destructive',
        icon: 'flag',
        handler: () => {
          this.router.navigateByUrl('/change-credentials/change_username', { replaceUrl: true });
        }
      }, {
        text: this.translateService.instant('CambioCredenziali.Email'),
        icon: 'flag',
        handler: () => {
          this.router.navigateByUrl('/change-credentials/change_email', { replaceUrl: true });
        }
      },
        {
          text: this.translateService.instant('CambioCredenziali.Password'),
          icon: 'flag',
          handler: () => {
            this.router.navigateByUrl('/change-credentials/reauth', { replaceUrl: true });
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  signOut(){
    this.usersService.signOut().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    });
    //this.navCotroller.navigateRoot('login');
  }

  select(lng){
    this.languageService.setLanguage(lng)
  }
}

