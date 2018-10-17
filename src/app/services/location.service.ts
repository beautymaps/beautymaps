import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {
location:any = {
    lat: 38.8629928,
    long: -77.0770367
  };

  constructor() { }

  
  getCurrentLocation(callback) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location.lat = position.coords.latitude;
      this.location.long = position.coords.longitude;
      return callback(this.location);
    })
  }

}
