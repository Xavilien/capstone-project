import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from "@ionic-native/http";

/*
const httpOptions = {
  headers: new HttpHeaders({
    'Accept' : 'application/json',
    'Content-Type':  "application/json; charset=UTF-8",
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Access-Control-Allow-Origin': '*',
  })
};
*/

@Injectable()
export class SendASRService {

  constructor(private http: HTTP) { }

  sendASR(myObj){

    let url = 'http://192.168.0.103:8000/speech/english/imda1';

    this.http.setDataSerializer("json");

    console.log(JSON.stringify(myObj));

    return this.http.post(url, myObj, {});
  }

}
