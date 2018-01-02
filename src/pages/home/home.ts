import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
declare var google:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  base64Image:any;
  latitude:any;
  longitude:any;
  productLocation:any;
  constructor(public navCtrl: NavController,private camera: Camera,private geolocation: Geolocation) {

  }
  takePicture(){
    console.log('clicked....')
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     // console.log(this.base64Image);
      this.getLocation()

    }, (err) => {
     alert('Handle error')
    });

  }
  geocodeAddress(lat,lng, callback) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat,lng);
    let request = {
        latLng: latlng
    };
    geocoder.geocode( { 'latLng': latlng}, function(data, status) {
        console.log(data);
        //console.log(status)
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(google.maps.GeocoderStatus)
            // var users = firebase.auth().currentUser.uid;
            // var ref = firebase.database().ref('users/' + users );
            callback(data[0].formatted_address); 
        } else {
            console.log("Geocode Error");
        }
    });
}

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) =>  {
      // resp.coords.latitude
      // resp.coords.longitude
      if(resp){
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      //  let newcode = new google.maps.Geocoder();
      //  let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      //  var geocoder = geocoder = new google.maps.Geocoder();

        this.geocodeAddress(resp.coords.latitude,resp.coords.longitude,(data)=>{
          console.log("map data: ");
          console.log(data);
          this.productLocation = data;
      });
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });

     
     /*let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
       console.log(this.latitude,this.longitude)
      // data can be a set of coordinates, or an error (if an error occurred).
       this.latitude=data.coords.latitude
       this.longitude=data.coords.longitude
     });*/
  }

}
