import {StoreHours} from "./store-hours"

export class UserProfile {
    uid?: String;
    userName:String;
    storeName?: String;
    phoneNumber: Number;
    reviews: Number;
    profileImage: String;
    email: String;
    facebook: String;
    instagram: String;
    youtube: String;
    website: String;
    storeHours: StoreHours[] = [
        {day: 'Monday', open:'', closed: ''},
        {day: 'Tuesday', open:'', closed: ''},
        {day: 'Wednesday', open:'', closed: ''},
        {day: 'Thursday', open:'', closed: ''},
        {day: 'Friday', open:'', closed: ''},
        {day: 'Saturday', open:'', closed: ''},
        {day: 'Sunday', open:'', closed: ''},
    ];
    providerId: String; 
    lat: Number;
    long: Number;
    address: String
}