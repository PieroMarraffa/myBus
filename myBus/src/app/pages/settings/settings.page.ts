import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from "@ionic/angular";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private navCotroller: NavController,
              private usersService: UsersService,
              private router: Router){ }

  ngOnInit() {
  }

  onHome(){
    this.navCotroller.navigateRoot('tabs');
  }

  signOut(){
    this.usersService.signOut().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    });
  }
}
