import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { booking, capturePayment, savePayment, searchOnsiteTutor , searchOnsiteTutor_Result } from 'src/app/Classes/student';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';
declare var $: any
@Component({
  selector: 'app-on-site-tutor-search',
  templateUrl: './on-site-tutor-search.component.html',
  styleUrls: ['./on-site-tutor-search.component.scss']
})
export class OnSiteTutorSearchComponent implements OnInit {
  
  @ViewChild('search') public searchElementRef: ElementRef;
  ReqsearchOnsiteTutor: searchOnsiteTutor;



  ObjLocation: maplatlong;
  lstLocation: maplatlong[];
  searchOnsiteTutor: searchOnsiteTutor;
  lstsearchOnsiteTutor_Result: searchOnsiteTutor_Result[];
  objsearchOnsiteTutor_Result: searchOnsiteTutor_Result;
  objsavePayment: savePayment;
  objcapturePayment: capturePayment;
  booking: booking;
  subjectName:string ="";
  BookingID :string ="";
  stripeID: string ="";
  countries = [];
  selectdAmount:number = 0;
  selectedID:any ="";
  stripeKey:string ="";
  isLoading = false;
  addLocation = false;

  latitude = 51.678418;
  longitude = 7.809007;

  zoom;
  geoCoder;
  address;

  selectedTutorMode = '0';
  selectedTutorType = '0';
  selCountry;
  envData;

  constructor(
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { 
    this.envData = environment;
    this.stripeKey =this.envData.stripeKey; 
    this.searchOnsiteTutor = new searchOnsiteTutor();
    this.route.queryParams.subscribe(params => {
      console.log("online")
      this.searchOnsiteTutor.fromprice = params.fromprice;  
      this.searchOnsiteTutor.subjectid = params.subjectid;
      this.searchOnsiteTutor.subjectcategoryid = params.subjectcategoryid;
      this.searchOnsiteTutor.fromprice = params.fromprice
      this.searchOnsiteTutor.toprice = params.toprice; 
      this.searchOnsiteTutor.fromtime = params.fromtime; 
      this.searchOnsiteTutor.totime = params.totime; 
      this.searchOnsiteTutor.radius = params.radius; 
      this.searchOnsiteTutor.startdate = params.startdate,
      this.searchOnsiteTutor.numberofweek = params.numberofweek; 
      this.subjectName =  params.subjectName;
  }); 
  this.lstsearchOnsiteTutor_Result = [];
  this.objsearchOnsiteTutor_Result =  new searchOnsiteTutor_Result();
  this.booking = new booking();

    this.ObjLocation = new maplatlong();
    this.lstLocation = [];
    this.ReqsearchOnsiteTutor = new searchOnsiteTutor();
    this.objsavePayment = new  savePayment();
    this.objcapturePayment = new  capturePayment();
    
  }
  sub: any;
  async ngOnInit(): Promise<void> {
    debugger;

    this.invokeStripe();


    this.getLocations(33.64884551753966, 73.07665240318698,'Alabaiqbal Park'),
    this.getLocations(33.648416818371544, 73.0840338424697 , 'Noor Force Acadmy')
    this.getLocations(33.65181062833013, 73.08278929747435  ,'Lohari Nashta')
    this.getLocations(33.64510772482633, 73.0734927609359   ,'sultan ka Koh')

    const countryData = await this.apiService.getCountriesList().toPromise();
    this.countries = countryData.result;

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

      this.geoCoder = new google.maps.Geocoder();
    });
    this.GetOnsiteTutor();
  }
  
  //Search/searchonlinetutor
  converts(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  GetOnsiteTutor(){

    this.searchOnsiteTutor.startdate= this.converts(this.searchOnsiteTutor.startdate);   
    var token = sessionStorage.getItem("token");
    this.searchOnsiteTutor.authtoken = token;
    var stdID =  sessionStorage.getItem("loginid");
    this.searchOnsiteTutor.studentid = Number(stdID)
    this.apiService.post(this.searchOnsiteTutor , "Search/searchonsitetutor").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success" || rtnData.message == "success") {
        this.lstsearchOnsiteTutor_Result = rtnData.result;
      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }
 
  BookNow(id: any =""){
    //Booking/dobooking
    debugger;
    this.objsearchOnsiteTutor_Result =  this.lstsearchOnsiteTutor_Result.filter( x=> x.id == this.selectedID)[0];
    // this.searchOnsiteTutor.startdate= this.converts(this.searchOnsiteTutor.startdate);   
    var token = sessionStorage.getItem("token");
    var Userid = sessionStorage.getItem("loginid")

    this.booking.authtoken = token;
    this.booking.studentid = Number(Userid);
    this.booking.tutorid = this.objsearchOnsiteTutor_Result.id;
    this.booking.subjectid = this.searchOnsiteTutor.subjectid;
    this.booking.subjectcategoryid = this.searchOnsiteTutor.subjectcategoryid;
    this.booking.bookingtype = 'online';
    this.booking.timefrom = this.searchOnsiteTutor.fromtime;
    this.booking.deviceplatform  = 'web';
    this.booking.devicemodel = ""; 
    this.booking.addressid = 0;
    this.booking.startdate = this.searchOnsiteTutor.startdate;
    this.apiService.post(this.booking , "Booking/dobooking").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success" || rtnData.message == "success") {
        this.toastService.success("Successfully saved");
        this.BookingID = rtnData.bookingid;

        this.capturePayment(this.BookingID, this.stripeID);
      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }

  capturePayment(BookingID:any, stripeID:any){
    var token = sessionStorage.getItem("token");
    var loginEmail = sessionStorage.getItem("loginEmail")
    this.objcapturePayment.bookingid = BookingID;
    this.objcapturePayment.paymentmethodid = stripeID;
    this.objcapturePayment.amount =   this.selectdAmount;
    this.objcapturePayment.currency =   "usd";
    this.objcapturePayment.authtoken = token;
    this.objcapturePayment.useremail = loginEmail;   
    
    this.apiService.post(this.objcapturePayment , "Payment/capturepayment").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success" || rtnData.message == "success") {
        this.toastService.success("Successfully saved");

        this.SavePayment(rtnData.chargeid, rtnData.transactionid);        
      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }
  SavePayment(chargeid : any, transactionid: any){
     var token = sessionStorage.getItem("token");
    var loginEmail = sessionStorage.getItem("loginEmail")

    this.objsavePayment.chargeid = chargeid;
    this.objsavePayment.transactionid = transactionid;
    this.objsavePayment.customerid = '';
    this.objsavePayment.numberofweek = this.searchOnsiteTutor.numberofweek;
    this.objsavePayment.bookingid = this.objcapturePayment.bookingid;
    this.objsavePayment.amount = this.selectdAmount.toString();
    this.objsavePayment.authtoken = token;
    this.objsavePayment.paymentmethodid = this.stripeID;

    
    this.apiService.post(this.objsavePayment , "Payment/savepayment").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success" || rtnData.message == "success") {
        this.toastService.success("Successfully saved");
        
      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }
  setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        debugger;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude): void {
    debugger;
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK') {

          debugger
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            this.toastService.success('No results found');
          }
        } else {
          // this.toastService.error(`Geocoder failed due to: ${status}`);
          console.log(`Geocoder failed due to: ${status}`);
        }
      });
  }

 getLocations(lati: number, Longi: number , LocationName : string){
  this.ObjLocation = new  maplatlong();
  this.ObjLocation.Lati = lati;
  this.ObjLocation.Longi = Longi;
  this.ObjLocation.LocationName = LocationName;
this.lstLocation.push(this.ObjLocation);
}


  fnPlaceMarker(event): void {
    this.addLocation = true;
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  markerDragEnd($event: any): void {
    console.log('drag implemented');
  }
  DoBooking(){
    alert('Test')
  }

  closeModal: string;
  triggerModal(content) {
    this.invokeStripe();
    // alert('Test')
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    //   this.closeModal = `Closed with: ${res}`;
    // }, (res) => {
    //   this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    // });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  makePayment(amount, id: any) {
    debugger;
    this.selectdAmount = amount;
    this.selectedID = id;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeKey,
      locale: 'auto',
      token: (stripeToken: any) => {   
        console.log(stripeToken)
        this.stripeID = stripeToken.id; 
        this.BookNow(this.stripeID); 
      }
    });

    

    paymentHandler.open({
      name: 'Stripe',
      description: '2 widgets',
      amount: amount * 100
    });
  }
  paymentHandler:any = null;
   
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
         
      window.document.body.appendChild(script);
    }
  }

}



export class maplatlong{
  Lati: number;
  Longi: number;
  LocationName :string;
  /**
   *
   */
  constructor() {
      this.Lati = 0;
      this.Longi = 0;
      this.LocationName = "";
  }
}
