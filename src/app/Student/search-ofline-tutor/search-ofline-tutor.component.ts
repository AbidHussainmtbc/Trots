import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { searchOnsiteTutor } from 'src/app/Classes/student';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
// import {maplatlong} from 'src/app/Classes/student/maplatlong'
@Component({
  selector: 'app-search-ofline-tutor',
  templateUrl: './search-ofline-tutor.component.html',
  styleUrls: ['./search-ofline-tutor.component.scss']
})
export class SearchOflineTutorComponent implements OnInit {
  @ViewChild('search') public searchElementRef: ElementRef;
  ReqsearchOnsiteTutor: searchOnsiteTutor;



  ObjLocation: maplatlong;
  lstLocation: maplatlong[];
  countries = [];

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


  constructor(
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService,
    private route: ActivatedRoute
    ) { 
      
      this.route.queryParams.subscribe(params => {
        console.log("Offline")
        console.log(params);
    });
    this.ObjLocation = new maplatlong();
    this.lstLocation = [];
    this.ReqsearchOnsiteTutor = new searchOnsiteTutor();
    
  }

  async ngOnInit(): Promise<void> {
    debugger;
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
  }

  GetOnsiteTutor(){

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
