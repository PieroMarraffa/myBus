import { Component } from '@angular/core';
import{AlertController} from "@ionic/angular";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage {
  paymentAmount: string = '1.20';
  currency: string = 'USD';
  currencyIcon: string = '$';
  constructor(private alertController: AlertController) {
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction

        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
              // Show a success message to the buyer
              console.log(details);
            let lenght=4;
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 10; i++ ) {
              result += characters.charAt(Math.floor(Math.random() *
                charactersLength));}
              alert("questo è il codice: "+ result);
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)


  }

  generateCode() {
    let lenght=10;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Ticket's code" ,
      message: 'Transaction completed by ' + 'details.payer.name.given_name' + '! \n'
      + 'il tuo codice è: '+ this.generateCode(),
      buttons: [
         {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
