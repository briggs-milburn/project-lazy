import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


/**
 * Generated class for the BillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http : HttpClient,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillsPage');
  }

  /**
   * @name items
   * @type {Array}
   * @public
   * @description     Used to store returned PHP data
   */
  public items : Array<any> = [];

  /**
   * Triggered when template view is about to be entered
   * Returns and parses the PHP data through the load() method
   *
   * @public
   * @method ionViewWillEnter
   * @return {None}
   */
  ionViewWillEnter() : void
  {
    this.load();
  }

  /**
   * Allow navigation to the AddTechnologyPage for creating a new entry
   *
   * @public
   * @method addEntry
   * @return {None}
   */
  addEntry() : void
  {
    this.navCtrl.push('FinancialPage');
  }

  /**
   * Retrieve the JSON encoded data from the remote server
   * Using Angular's Http class and an Observable - then
   * assign this to the items array for rendering to the HTML template
   *
   * @public
   * @method load
   * @return {None}
   */
  load() : void
  {
    this.http
      .get('http://ec2-18-225-37-153.us-east-2.compute.amazonaws.com/resources/retrieve-finance.php')
      .subscribe((data : any) =>
        {
          console.dir(data);
          this.items = data;
        },
        (error : any) =>
        {
          console.dir(error);
        });
  }

  /**
   * Allow navigation to the AddTechnologyPage for amending an existing entry
   * (We supply the actual record to be amended, as this method's parameter,
   * to the AddTechnologyPage
   *
   * @public
   * @method viewEntry
   * @param param 		{any} 			Navigation data to send to the next page
   * @return {None}
   */
  viewEntry(param : any) : void
  {
    this.navCtrl.push('FinancialPage', param);
  }

}
