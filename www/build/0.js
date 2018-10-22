webpackJsonp([0],{

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTechnologyPageModule", function() { return AddTechnologyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_technology__ = __webpack_require__(763);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddTechnologyPageModule = (function () {
    function AddTechnologyPageModule() {
    }
    AddTechnologyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_technology__["a" /* AddTechnologyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_technology__["a" /* AddTechnologyPage */]),
            ],
        })
    ], AddTechnologyPageModule);
    return AddTechnologyPageModule;
}());

//# sourceMappingURL=add-technology.module.js.map

/***/ }),

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTechnologyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddTechnologyPage = (function () {
    // Initialise module classes
    function AddTechnologyPage(navCtrl, http, NP, fb, toastCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.NP = NP;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        /**
         * @name isEdited
         * @type {Boolean}
         * @public
         * @description     Flag to be used for checking whether we are adding/editing an entry
         */
        this.isEdited = false;
        /**
         * @name hideForm
         * @type {Boolean}
         * @public
         * @description     Flag to hide the form upon successful completion of remote operation
         */
        this.hideForm = false;
        /**
         * @name recordID
         * @type {String}
         * @public
         * @description     Property to store the recordID for when an existing entry is being edited
         */
        this.recordID = null;
        /**
         * @name baseURI
         * @type {String}
         * @public
         * @description     Remote URI for retrieving data from and sending data to
         */
        this.baseURI = "http://ec2-18-225-37-153.us-east-2.compute.amazonaws.com/resources/";
        // Create form builder validation rules
        this.form = fb.group({
            "name": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            "description": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
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
    AddTechnologyPage.prototype.ionViewWillEnter = function () {
        this.resetFields();
        if (this.NP.get("record")) {
            this.isEdited = true;
            this.selectEntry(this.NP.get("record"));
            this.pageTitle = 'Amend entry';
        }
        else {
            this.isEdited = false;
            this.pageTitle = 'Create entry';
        }
    };
    /**
     * Assign the navigation retrieved data to properties
     * used as models on the page's HTML form
     *
     * @public
     * @method selectEntry
     * @param item 		{any} 			Navigation data
     * @return {None}
     */
    AddTechnologyPage.prototype.selectEntry = function (item) {
        this.technologyName = item.name;
        this.technologyDescription = item.description;
        this.recordID = item.id;
    };
    /**
     * Save a new record that has been added to the page's HTML form
     * Use angular's http post method to submit the record data
     *
     * @public
     * @method createEntry
     * @param name 			{String} 			Name value from form field
     * @param description 	{String} 			Description value from form field
     * @return {None}
     */
    AddTechnologyPage.prototype.createEntry = function (name, description) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "create", "name": name, "description": description }, url = this.baseURI + "manage-data.php";
        this.http.post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            // If the request was successful notify the user
            _this.hideForm = true;
            _this.sendNotification("Congratulations the technology: " + name + " was successfully added");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
        });
    };
    /**
     * Update an existing record that has been edited in the page's HTML form
     * Use angular's http post method to submit the record data
     * to our remote PHP script
     *
     * @public
     * @method updateEntry
     * @param name 			{String} 			Name value from form field
     * @param description 	{String} 			Description value from form field
     * @return {None}
     */
    AddTechnologyPage.prototype.updateEntry = function (name, description) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "update", "name": name, "description": description, "recordID": this.recordID }, url = this.baseURI + "manage-data.php";
        this.http
            .post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            // If the request was successful notify the user
            _this.hideForm = true;
            _this.sendNotification("Congratulations the technology: " + name + " was successfully updated");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
        });
    };
    /**
     * Remove an existing record that has been selected in the page's HTML form
     * Use angular's http post method to submit the record data
     * to our remote PHP script
     *
     * @public
     * @method deleteEntry
     * @return {None}
     */
    AddTechnologyPage.prototype.deleteEntry = function () {
        var _this = this;
        var name = this.form.controls["name"].value, headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "delete", "recordID": this.recordID }, url = this.baseURI + "manage-data.php";
        this.http
            .post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            _this.hideForm = true;
            _this.sendNotification("Congratulations the technology: " + name + " was successfully deleted");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
        });
    };
    /**
     * Handle data submitted from the page's HTML form
     * Determine whether we are adding a new record or amending an
     * existing record
     *
     * @public
     * @method saveEntry
     * @return {None}
     */
    AddTechnologyPage.prototype.saveEntry = function () {
        var name = this.form.controls["name"].value, description = this.form.controls["description"].value;
        if (this.isEdited) {
            this.updateEntry(name, description);
        }
        else {
            this.createEntry(name, description);
        }
    };
    /**
     * Clear values in the page's HTML form fields
     *
     * @public
     * @method resetFields
     * @return {None}
     */
    AddTechnologyPage.prototype.resetFields = function () {
        this.technologyName = "";
        this.technologyDescription = "";
    };
    /**
     * Manage notifying the user of the outcome of remote operations
     *
     * @public
     * @method sendNotification
     * @param message 	{String} 			Message to be displayed in the notification
     * @return {None}
     */
    AddTechnologyPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    AddTechnologyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-technology',template:/*ion-inline-start:"C:\Users\Briggs Milburn\GitHub\project-lazy\src\pages\add-technology\add-technology.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ pageTitle }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <div>\n    <ion-item *ngIf="isEdited && !hideForm">\n      <button\n        ion-button\n        item-right\n        color="secondary"\n        text-center\n        block\n        (click)="deleteEntry()">Remove this Entry?</button>\n    </ion-item>\n\n\n    <div *ngIf="hideForm">\n      <ion-item class="post-entry-message" text-wrap>\n        <h2>Success!</h2>\n        <p>Maybe you\'d like to edit an existing entry or add a new record?</p>\n        <p>Simply go back to the home page and select the option you want to pursue.</p>\n      </ion-item>\n    </div>\n\n\n    <div *ngIf="!hideForm">\n      <form [formGroup]="form" (ngSubmit)="saveEntry()">\n\n        <ion-list>\n          <ion-item-group>\n            <ion-item-divider color="light">Technology Name *</ion-item-divider>\n            <ion-item>\n              <ion-input\n                type="text"\n                placeholder="Enter a name..."\n                formControlName="name"\n                [(ngModel)]="technologyName"></ion-input>\n            </ion-item>\n          </ion-item-group>\n\n\n          <ion-item-group>\n            <ion-item-divider color="light">Technology Description *</ion-item-divider>\n            <ion-item>\n              <ion-textarea\n                placeholder="Description..."\n                formControlName="description"\n                rows="6"\n                [(ngModel)]="technologyDescription"></ion-textarea>\n            </ion-item>\n          </ion-item-group>\n\n\n          <ion-item>\n            <button\n              ion-button\n              color="primary"\n              text-center\n              block\n              [disabled]="!form.valid">Save Entry</button>\n          </ion-item>\n\n        </ion-list>\n\n      </form>\n    </div>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Briggs Milburn\GitHub\project-lazy\src\pages\add-technology\add-technology.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], AddTechnologyPage);
    return AddTechnologyPage;
}());

//# sourceMappingURL=add-technology.js.map

/***/ })

});
//# sourceMappingURL=0.js.map