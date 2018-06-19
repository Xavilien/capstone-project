import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { Level1Page } from '../pages/level1/level1';
import { Level2Page } from '../pages/level2/level2';
import { Level3Page } from '../pages/level3/level3';
import { ProfilePage } from '../pages/profile/profile';
import { ResultsPage } from '../pages/results/results';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { HTTP } from "@ionic-native/http";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    TabsControllerPage,
    Level1Page,
    Level2Page,
    Level3Page,
    ProfilePage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    TabsControllerPage,
    Level1Page,
    Level2Page,
    Level3Page,
    ProfilePage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Media,
    File,
    HTTP
  ]
})
export class AppModule {}
