import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  onSettings() {
    this.navController.navigateRoot('settings')
  }

  changePhoto(){}

  toPreferences(){
    this.navController.navigateRoot('preferences');
  }

  toTickets(){
    this.navController.navigateRoot('tickets');
  }

}
