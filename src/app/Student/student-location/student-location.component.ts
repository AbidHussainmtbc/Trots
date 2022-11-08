import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-student-location',
  templateUrl: './student-location.component.html',
  styleUrls: ['./student-location.component.scss']
})
export class StudentLocationComponent implements OnInit  {

  @ViewChild('search') public searchElementRef: ElementRef;

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
    private utilsService: UtilsService, private apiService: ApiServiceService
  ) { }

  async ngOnInit(): Promise<void> {
    debugger;
    const countryData = await this.apiService.getCountriesList().toPromise();
    this.countries = countryData.result;

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

      this.geoCoder = new google.maps.Geocoder();
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

  UpdateLocation(): void {
    // this.router.navigateByUrl('std/Reg/TermConditions');
    // return

    debugger;
    if (this.selCountry == undefined) {
      this.toastService.error("Please select location.");
    }
    else {
      this.isLoading = true;
      console.log('location', this.latitude, this.longitude);

      const locationInfo = {
        mode: this.selectedTutorMode,
        type: this.selectedTutorType,
        latitude: this.latitude,
        longitude: this.longitude,
        country: localStorage.getItem('regUserCountry'),
        address: this.selCountry.name
      };
      sessionStorage.setItem("currencySymbol", this.selCountry.currencySymbol)
      this.apiService.fnSaveStudentLocationInfo(locationInfo).subscribe(res => {
        console.log('response from server', res);
        this.isLoading = false;

        if (res.statuscode === 200) {
          console.log('info saved');
          this.router.navigateByUrl('std/Reg/TermConditions');
        }
      });
    }

  }

  fnPlaceMarker(event): void {
    this.addLocation = true;
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  markerDragEnd($event: any): void {
    console.log('drag implemented');
  }

  // searchLocation(): void {
  //   const autocomplete = this.geoCoder.places.Autocomplete(this.searchElementRef.nativeElement);
  //   autocomplete.addListener('place_changed', () => {
  //     this.ngZone.run(() => {
  //
  //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //
  //       if (place.geometry === undefined || place.geometry === null) {
  //         return;
  //       }
  //
  //       this.latitude = place.geometry.location.lat();
  //       this.longitude = place.geometry.location.lng();
  //       console.log('place', this.latitude, this.longitude);
  //       this.zoom = 12;
  //     });
  //   });
  // }
}
