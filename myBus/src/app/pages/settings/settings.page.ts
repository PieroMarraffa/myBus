import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from "@ionic/angular";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private navCotroller: NavController,
              private usersService: UsersService){ }

  ngOnInit() {
  }

  onHome(){
    this.navCotroller.navigateRoot('tabs');
  }

  signOut(){
    this.usersService.signOut();
    this.navCotroller.navigateRoot('login');
  }
}
