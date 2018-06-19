import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-level1',
  templateUrl: 'level1.html',
  providers: [ Media ],
})

export class Level1Page {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private media: Media) {
  }

  file: MediaObject;
  recording: boolean = false;
  myColor: string = 'primary';

  ionViewDidEnter() {
    this.file = this.media.create('test.mp3');
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: ['OK']
    });
    alert.present();
  }

  record() {
    if (this.recording == false) {
      this.myColor = 'danger';
      this.file.startRecord();
      this.recording = true;
      this.showAlert('Success');
      console.log('Success')
    }
    else {
      this.file.stopRecord();
      this.myColor = 'primary';
      this.file.play();
      this.recording = false;
      console.log(this.file);
      console.log(this.file.getDuration());
    }
  }


}
