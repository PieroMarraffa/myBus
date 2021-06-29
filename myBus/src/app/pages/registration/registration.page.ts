import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {UsersService} from "../../services/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController, LoadingController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  credentialForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private usersService: UsersService,
              private navController: NavController) {
  }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.usersService.signUp(this.credentialForm.value).then(user => {
      loading.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    }, async err => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registrazione non effettuata',
        message: err.message,
        buttons: ['OK']
      });

      await alert.present();
    });
  }

  get email(){
    return this.credentialForm.get('email');
  }

  get password(){
    return this.credentialForm.get('password');
  }
}