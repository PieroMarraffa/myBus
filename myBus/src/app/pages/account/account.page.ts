import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";
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

  profileImg: any = '😜';

  constructor(private navController: NavController,
              private afs: AngularFirestore,
              private userService: UsersService,
              private alertController: AlertController) { }

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

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '😀',
          value: 'value1',
          handler: () => {
            for (let radioButton of alert.inputs){
              if (radioButton.checked == true) radioButton.checked = false;
            }
            alert.inputs[0].checked = true;
          },
          //checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '😇',
          value: 'value2',
          handler: () => {
            for (let radioButton of alert.inputs){
              if (radioButton.checked == true) radioButton.checked = false;
            }
            alert.inputs[1].checked = true;          }
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '😊',
          value: 'value3',
          handler: () => {
            for (let radioButton of alert.inputs){
              if (radioButton.checked == true) radioButton.checked = false;
            }
            alert.inputs[2].checked = true;          }
        },
        {
          name: 'radio4',
          type: 'radio',
          label: '😡',
          value: 'value4',
          handler: () => {
            for (let radioButton of alert.inputs){
              if (radioButton.checked == true) radioButton.checked = false;
            }
            alert.inputs[3].checked = true;          }
        },
        {
          name: 'radio5',
          type: 'radio',
          label: '😰',
          value: 'value5',
          handler: () => {
            for (let radioButton of alert.inputs){
              if (radioButton.checked == true) radioButton.checked = false;
            }
            alert.inputs[4].checked = true;          }
        },
        {
          name: 'radio6',
          type: 'radio',
          label: '😜',
          value: 'value6',
          handler: () => {
            for (let radioButton of alert.inputs){
              if (radioButton.checked == true) radioButton.checked = false;
            }
            alert.inputs[5].checked = true;
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.changeProfileImg(alert.inputs);
          }
        }
      ]
    });

    await alert.present();
  }

  async changeProfileImg(radioList){
    for (let radioButton of radioList){
      if (radioButton.checked){
        this.profileImg = radioButton.label;
      }
    }
  }
}
