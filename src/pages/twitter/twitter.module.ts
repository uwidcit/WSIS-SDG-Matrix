import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwitterPage } from './twitter';

@NgModule({
  declarations: [
    TwitterPage,
  ],
  imports: [
    IonicPageModule.forChild(TwitterPage),
  ]
  ,exports: [
    TwitterPage
  ]
})
export class TwitterPageModule {}
