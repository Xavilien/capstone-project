import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { SendASRService} from "../../app/asr/asr.service";
import {TextToSpeech} from "@ionic-native/text-to-speech";

@Component({
  selector: 'page-level1',
  templateUrl: 'level1.html',
  providers: [ SendASRService ]
})

export class Level1Page {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  myColour: string;
  asrResponse: any;
  text: string[] = ["read", "this", "easy", "level", "one", "text"];
  undetected: any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private media: Media,
              private file: File,
              public platform: Platform,
              public sendASRService: SendASRService,
              private tts: TextToSpeech) {
  }

  ionViewWillEnter() {
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: ['OK']
    });
    alert.present();
  }

  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.ogg';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    else {
      return false
    }
    this.audio.startRecord();
    this.recording = true;
    return true
  }

  stopRecord() {
    this.audio.stopRecord();
    this.audioList.push(this.audio);
    this.recording = false;
    //let data = { filename: this.fileName };
    //this.audioList.push(data);
  }

  sendToASR() {
    console.log("Test");
    let audioContent, filepath;

    if (this.platform.is('ios')) {
      filepath = this.file.documentsDirectory.replace(/file:\/\//g, '');
    } else if (this.platform.is('android')) {
      filepath = 'file://' + this.file.externalDataDirectory.replace(/file:\/\//g, ''); // Must add 'file://' if not it will fail
    }

    /*this.file.listDir(filepath, 'files').then(items =>{
      for(let i in items){
        console.log(items[i]);
      }
    }).catch(err => {
        console.log(JSON.stringify(err));
      });*/
    console.log("Converting");

    this.file.readAsDataURL(filepath, this.fileName).then(result => {
      console.log("Read");
      audioContent = result;
      console.log(audioContent);
      audioContent = audioContent.replace('data:application/ogg;base64,','');

      let myObj = { Wavfile: this.fileName, EncodedSpeech: audioContent};

      console.log("Sending audio...");

      this.sendASRService.sendASR(myObj).then(data => {
        //console.log(JSON.stringify(data));
        this.asrResponse = JSON.parse(data.data)["decodeText"];
        this.asrResponse = this.asrResponse.replace(/(\r\n\t|\n|\r\t)/gm,"");
        this.asrResponse = this.asrResponse.split(" ");
        this.undetected = this.text.slice();
        this.undetected = this.undetected.filter(word => this.asrResponse.indexOf(word) == -1);
        console.log(JSON.stringify(this.undetected));
      }, err => {
        console.log(JSON.stringify(err));
      });
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  playAudio(audio) {
    audio.play();
    audio.setVolume(0.8);
  }

  readText(text) {
    this.tts.speak({text: text, rate: 1/2,})
      .then(() => console.log(text))
      .catch((err: any) => console.log(err));
  }

  record() {
    if (this.recording) {
      this.myColour = 'primary';
      this.stopRecord();
      console.log('Stopped recording');
      this.playAudio(this.audioList[(this.audioList.length - 1)]);
      this.sendToASR();
    }
    else if (this.startRecord()) {
      this.myColour = 'danger';
      console.log('Starting to record');
    }
    else {
      this.showAlert('Failed to record audio')
    }
  }
}
