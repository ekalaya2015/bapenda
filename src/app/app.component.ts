import { Component } from '@angular/core';
import { OneSignal } from 'onesignal-ngx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Emtres - Tax Monitoring';
  constructor(private oneSignal: OneSignal){
    this.oneSignal.init({appId:"3c668c69-f13b-4ea6-9593-dd41c7e3c724"})
  }
}
