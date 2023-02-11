import {Component, OnChanges, OnInit} from '@angular/core';
import {AppHttpService} from "./app-http.service";
import {firstValueFrom, map, tap} from "rxjs";
import {Tester} from "./tester.model";
import {Device} from "./device.model";
import {MatSelectChange} from "@angular/material/select";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo-front';

  testers: Tester[] = [];
  devices: Device[] = [];
  countries: string[] = [];
  currentDevice: string = 'All';
  currentCountry: string = 'All';

  constructor(private appHttpService: AppHttpService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getTesters()
    await this.getDevices()
    await this.getCountries()
  }

  getTesters() {
    return firstValueFrom(this.appHttpService.getTesters(this.currentCountry, this.currentDevice)
      .pipe(
        map((resp: any) => this.testers = resp.items)
      )
    )
  }

  getDevices() {
    return firstValueFrom(this.appHttpService.getDevices()
      .pipe(
        map((resp: any) => this.devices = resp.items),
        tap(() => this.devices.push(new Device(0, 'All')))
      )
    )
  }

  getCountries() {
    return firstValueFrom(this.appHttpService.getCountries()
      .pipe(
        map((resp: any) => this.countries = resp.items),
        tap(() => this.countries.push('All'))
      )
    )
  }


  async changeCountry($event: MatSelectChange) {
    this.currentCountry = $event.value;
    await this.getTesters()
  }

  async changeDevice($event: MatSelectChange) {
    this.currentDevice = $event.value
    await this.getTesters()
  }
}
