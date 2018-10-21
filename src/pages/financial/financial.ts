import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-financial',
  templateUrl: 'financial.html'
})
export class FinancialPage {



  /**
   * @name form
   * @type {FormGroup}
   * @public
   * @description     Define FormGroup property for managing form validation / data retrieval
   */
  public form                   : FormGroup;




  /**
   * @name financialBillType
   * @type {Any}
   * @public
   * @bill_type
   */
  public financialBillType         : any;

  /**
   * @name financialYear
   * @type {Any}
   * @public
   * @year
   */
  public financialYear         : any;
  /**
   * @name financialMonth
   * @type {Any}
   * @public
   * @month
   */
  public financialMonth         : any;
  /**
   * @name financialCost
   * @type {Any}
   * @public
   * @cost
   */
  public financialCost         : any;
  /**
   * @name financialDayDue
   * @type {Any}
   * @public
   * @day_due
   */
  public financialDayDue         : any;
  /**
   * @name financialFrequency
   * @type {Any}
   * @public
   * @frequency
   */
  public financialFrequency         : any;
  /**
   * @name financialStatus
   * @type {Any}
   * @public
   * @status
   */
  public financialStatus         : any;
  /**
   * @name financialNotes
   * @type {Any}
   * @public
   * @notes
   */
  public financialNotes         : any;





  /**
   * @name isEdited
   * @type {Boolean}
   * @public
   * @description     Flag to be used for checking whether we are adding/editing an entry
   */
  public isEdited               : boolean = false;




  /**
   * @name hideForm
   * @type {Boolean}
   * @public
   * @description     Flag to hide the form upon successful completion of remote operation
   */
  public hideForm               : boolean = false;




  /**
   * @name pageTitle
   * @type {String}
   * @public
   * @description     Property to help set the page title
   */
  public pageTitle              : string;




  /**
   * @name recordID
   * @type {String}
   * @public
   * @description     Property to store the recordID for when an existing entry is being edited
   */
  public recordID               : any      = null;




  /**
   * @name baseURI
   * @type {String}
   * @public
   * @description     Remote URI for retrieving data from and sending data to
   */
  private baseURI               : string  = "http://ec2-18-225-37-153.us-east-2.compute.amazonaws.com/resources/";




  // Initialise module classes
  constructor(public navCtrl    : NavController,
              public http       : HttpClient,
              public NP         : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController)
  {

    // Create form builder validation rules
    this.form = fb.group({
      "bill_type"                  : ["", Validators.required],
      "year"           : ["", Validators.required],
      "month"                  : ["", Validators.required],
      "cost"                  : ["", Validators.required],
      "day_due"                  : ["", Validators.required],
      "frequency"                  : ["", Validators.required],
      "status"                  : ["", Validators.required],
      "notes"                  : ["", Validators.required]
    });
  }




  /**
   * Triggered when template view is about to be entered
   * Determine whether we adding or editing a record
   * based on any supplied navigation parameters
   *
   * @public
   * @method ionViewWillEnter
   * @return {None}
   */
  ionViewWillEnter() : void
  {
    this.resetFields();

    if(this.NP.get("record"))
    {
      this.isEdited      = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle     = 'Amend entry';
    }
    else
    {
      this.isEdited      = false;
      this.pageTitle     = 'Create entry';
    }
  }




  /**
   * Assign the navigation retrieved data to properties
   * used as models on the page's HTML form
   *
   * @public
   * @method selectEntry
   * @param item 		{any} 			Navigation data
   * @return {None}
   */
  selectEntry(item : any) : void
  {
    this.financialBillType        = item.bill_type;
    this.financialYear = item.year;
    this.financialMonth = item.month;
    this.financialCost = item.cost;
    this.financialDayDue = item.day_due;
    this.financialFrequency = item.frequency;
    this.financialStatus = item.status;
    this.financialNotes = item.notes;
    this.recordID              = item.id;
  }




  /**
   * Save a new record that has been added to the page's HTML form
   * Use angular's http post method to submit the record data
   *
   * @public
   * @method createEntry
   * @param billType 			{String} 			Name value from form field
   * @param year 	{Number} 			Description value from form field
   * @param month {Number}
   * @param cost {Number}
   * @param dayDue {Number}
   * @param frequency {String}
   * @param status {String}
   * @param notes {String}
   * @return {None}
   */
  createEntry(billType : string, year : number, month : number, cost : number, dayDue : number, frequency : string, status : string, notes : string) : void
  {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "create", "bill_type" : billType, "year" : year,
        "month" : month, "cost" : cost, "dayDue" : dayDue, "frequency" : frequency, "status" : status, "notes" : notes},
      url       : any      	= this.baseURI + "manage-finance.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          // If the request was successful notify the user
          this.hideForm   = true;
          this.sendNotification(`Congratulations Financial: ${billType} was successfully added`);
        },
        (error : any) =>
        {
          this.sendNotification('Something went wrong!');
        });
  }




  /**
   * Update an existing record that has been edited in the page's HTML form
   * Use angular's http post method to submit the record data
   * to our remote PHP script
   *
   * @public
   * @method updateEntry
   * @param billType 			{String} 			Name value from form field
   * @param year 	{Number} 			Description value from form field
   * @param month {Number}
   * @param cost {Number}
   * @param dayDue {Number}
   * @param frequency {String}
   * @param status {String}
   * @param notes {String}
   * @return {None}
   */
  updateEntry(billType : string, year : number, month : number, cost : number, dayDue : number, frequency : string, status : string, notes : string) : void
  {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "update", "bill_type" : billType, "year" : year,
        "month" : month, "cost" : cost, "dayDue" : dayDue, "frequency" : frequency, "status" : status, "notes" : notes, "recordID" : this.recordID},
      url       : any      	= this.baseURI + "manage-finance.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
        {
          // If the request was successful notify the user
          this.hideForm  =  true;
          this.sendNotification(`Congratulations Financial: ${billType} was successfully updated`);
        },
        (error : any) =>
        {
          this.sendNotification('Something went wrong!');
        });
  }




  /**
   * Remove an existing record that has been selected in the page's HTML form
   * Use angular's http post method to submit the record data
   * to our remote PHP script
   *
   * @public
   * @method deleteEntry
   * @return {None}
   */
  deleteEntry() : void
  {
    let billType      : string 	= this.form.controls["bill_type"].value,
      headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "delete", "recordID" : this.recordID},
      url       : any      	= this.baseURI + "manage-finance.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
        {
          this.hideForm     = true;
          this.sendNotification(`Congratulations Financial: ${billType} was successfully deleted`);
        },
        (error : any) =>
        {
          this.sendNotification('Something went wrong!');
        });
  }




  /**
   * Handle data submitted from the page's HTML form
   * Determine whether we are adding a new record or amending an
   * existing record
   *
   * @public
   * @method saveEntry
   * @return {None}
   */
  saveEntry() : void
  {
    let billType      : string 	= this.form.controls["bill_type"].value,
      year   : number    = this.form.controls["year"].value,
      month : number    = this.form.controls["month"].value,
      cost : number    = this.form.controls["cost"].value,
      day_due: number    = this.form.controls["day_due"].value,
      frequency : string    = this.form.controls["frequency"].value,
      status : string    = this.form.controls["status"].value,
      notes : string    = this.form.controls["notes"].value;

    if(this.isEdited)
    {
      this.updateEntry(billType, year, month, cost, day_due, frequency, status, notes);
    }
    else
    {
      this.createEntry(billType, year, month, cost, day_due, frequency, status, notes);
    }
  }




  /**
   * Clear values in the page's HTML form fields
   *
   * @public
   * @method resetFields
   * @return {None}
   */
  resetFields() : void
  {

    this.financialBillType        = "";
    this.financialYear = "";
    this.financialMonth = "";
    this.financialCost = "";
    this.financialDayDue = "";
    this.financialFrequency = "";
    this.financialStatus = "";
    this.financialNotes = "";
  }




  /**
   * Manage notifying the user of the outcome of remote operations
   *
   * @public
   * @method sendNotification
   * @param message 	{String} 			Message to be displayed in the notification
   * @return {None}
   */
  sendNotification(message : string)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }



}
