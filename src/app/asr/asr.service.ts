import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http";

@Injectable()
export class SendASRService {

  constructor(private http: HTTP) { }

  sendASR(myObj){

    let url = 'http://192.168.43.122:8000/speech/english/imda1';

    this.http.setDataSerializer("json");

    console.log(JSON.stringify(myObj));

    return this.http.post(url, myObj, {});
  }

}
