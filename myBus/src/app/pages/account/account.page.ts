import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {User} from "../../models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {UsersService} from "../../services/users.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: any;

  constructor(private navController: NavController,
              private afs: AngularFirestore,
              private userService: UsersService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    })
  }

  onSettings() {
    this.navController.navigateRoot('settings')
  }

  toPreferences(){
    this.navController.navigateRoot('preferences');
  }

  toTickets(){
    this.navController.navigateRoot('tickets');
  }

}
