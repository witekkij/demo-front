import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppHttpService} from "./app-http.service";
import {of} from "rxjs";
import {TesterBuilder} from "./tester.model";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";

describe('AppComponent', () => {
  let appHttpService: AppHttpService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        MatSlideToggleModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HttpClientModule,
        MatListModule,
        MatLineModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    appHttpService = TestBed.inject(AppHttpService)
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get updated testers list when country change', () => {
    const someTester = new TesterBuilder().rank(1).country('PL').firstName('John').lastName('Wayne').build()

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.testers = []
    spyOn(appHttpService, 'getTesters').and.returnValue(of({items: [someTester]}))
    app.changeCountry({value: 'PL'} as MatSelectChange)
    fixture.detectChanges()
    expect(app.testers).toEqual([someTester]);
  })

  it('should call backend for new list of Testers when country change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.testers = []
    const spy = spyOn(appHttpService, 'getTesters').and.returnValue(of({items: []}))
    app.changeDevice({value: 'iphone'} as MatSelectChange)
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith('All', 'iphone');
  })

  it('should call backend for new list of Testers when device change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.testers = []
    const spy = spyOn(appHttpService, 'getTesters').and.returnValue(of({items: []}))
    app.changeCountry({value: 'Mexico'} as MatSelectChange)
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith('Mexico', 'All');
  })

});
