import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  "application/json; charset=utf-8",
  })
};

@Injectable()
export class SendASRService {
  url = 'http://192.168.1.84:8000/speech/english/imda1.php';

  constructor(private http: HttpClient) { }

  sendASR(audioContent){
    let myObj = JSON.stringify({ "Wavfile": "FromBrowser.ogg",
      "EncodedSpeech": audioContent});

    console.log(myObj);

    return this.http.post(this.url, JSON.stringify(myObj), httpOptions);
  }

}
