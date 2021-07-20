import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {NavController, ToastController, ViewWillEnter} from "@ionic/angular";
import firebase from "firebase";
import AuthCredential = firebase.auth.AuthCredential;
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.page.html',
  styleUrls: ['./change-credentials.page.scss'],
})
export class ChangeCredentialsPage implements OnInit{

  changeCredentialsForm: FormGroup;

  changeId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UsersService,
              private navController: NavController,
              private  toaster: ToastController,
              private translateService: TranslateService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('changeId')){return;}
      this.changeId = paramMap.get('changeId');
      if (this.changeId == 'change_password'){
        this.changeCredentialsForm = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          cpassword: ['', [Validators.required, Validators.minLength(6)]]
        });
      }
      if (this.changeId == 'change_username'){
        this.changeCredentialsForm = this.fb.group({
          name: ['', [Validators.required]],
          surname: ['', [Validators.required]]
        });
      }
      if (this.changeId == 'change_email'){
        this.changeCredentialsForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
        });
      }
      if (this.changeId == 'reauth'){
        this.changeCredentialsForm = this.fb.group({
          reemail: ['', [Validators.required, Validators.email]],
          repassword: ['', [Validators.required, Validators.minLength(6)]]
        })
      }
    })
  }


  changeCredentials(){

    if (this.changeId == 'change_username'){
      return this.userService.changeCredentials(this.changeCredentialsForm.get('name').value + ' ' + this.changeCredentialsForm.get('surname').value).then(() => {
        this.navController.navigateRoot('/tabs/account');
        this.toast(this.translateService.instant("CambioCredenziali.toastName"), '');
      });
    }
    if (this.changeId == 'change_email'){
      return this.userService.changeCredentials(null, this.changeCredentialsForm.get('email').value, null).then(() => {
        this.navController.navigateRoot('/tabs/account');
        this.toast(this.translateService.instant("CambioCredenziali.toastEmail"), '');
      });
    }
    if (this.changeId == 'change_password' && this.changeCredentialsForm.get('password').value == this.changeCredentialsForm.get('cpassword').value){
      return this.userService.changeCredentials(null, null, this.changeCredentialsForm.get('password').value).then(() => {
        this.navController.navigateRoot('/tabs/account');
        this.toast(this.translateService.instant("CambioCredenziali.toastPassword"), '');
      });
    }
    if (this.changeId == 'reauth'){

      const user = firebase.auth().currentUser;

      const credential = firebase.auth.EmailAuthProvider.credential(this.changeCredentialsForm.get('reemail').value, this.changeCredentialsForm.get('repassword').value);

      return user.reauthenticateWithCredential(credential).then(() => {

        this.navController.navigateRoot('/change-credentials/change_password');
      }).catch((error) => {
        this.toast(this.translateService.instant("CambioCredenziali.toastErrore"), 'danger');
      });
    }
  }

  async toast(message, status){
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 1500
    });

    toast.present();

  }

  get email(){
    return this.changeCredentialsForm.get('email');
  }

  get password(){
    return this.changeCredentialsForm.get('password');
  }

  get reemail(){
    return this.changeCredentialsForm.get('reemail');
  }

  get repassword(){
    return this.changeCredentialsForm.get('repassword');
  }


}
