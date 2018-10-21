import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { SlideBoxPage } from '../slide-box/slide-box.page';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { AddTechnologyPage } from '../add-technology/add-technology';

import { Tile } from './models/tile.model';
import { EmailService } from '../../services/email.service';
import { CallService } from '../../services/call.service';
import { MapsService } from '../../services/maps.service';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { data } from './home-data';



@Component({
	templateUrl: 'home.html',
	providers: []
})
export class HomePage {
	public tiles: Tile[][];


	constructor(
		private emailService: EmailService,
		private callService: CallService,
		private mapsService: MapsService,
		private browserService: InAppBrowserService,
		public http : HttpClient,
    public navCtrl : NavController
	) {
		this.initTiles();
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
      .get('http://ec2-18-225-37-153.us-east-2.compute.amazonaws.com/resources/retrieve-data.php')
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
    this.navCtrl.push('AddTechnologyPage', param);
  }

	public navigateTo(tile) {
		this.navCtrl.setRoot(tile.component);
	}

	public getDirections() {
		this.mapsService.openMapsApp(data.officeLocation);
	}

	public sendEmail() {
		this.emailService.sendEmail(data.email);
	}

	public openFacebookPage() {
		this.browserService.open(data.facebook);
	}

	public callUs() {
		this.callService.call(data.phoneNumber);
	}

	private initTiles(): void {
		this.tiles = [[{
			title: 'Slides',
			path: 'slides',
			icon: 'swap',
			component: SlideBoxPage
		}], [{
			title: 'Map',
			path: 'map',
			icon: 'map',
			component: GoogleMapsPage
		}]];
	}
}
