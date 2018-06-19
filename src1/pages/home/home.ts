import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Level1Page } from '../level1/level1';
import { Level2Page } from '../level2/level2';
import { Level3Page } from '../level3/level3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToLevel1(params){
    if (!params) params = {};
    this.navCtrl.push(Level1Page);
  }goToLevel2(params){
    if (!params) params = {};
    this.navCtrl.push(Level2Page);
  }goToLevel3(params){
    if (!params) params = {};
    this.navCtrl.push(Level3Page);
  }
}
