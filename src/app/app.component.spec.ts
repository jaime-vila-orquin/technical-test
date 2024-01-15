import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let translocoService: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslocoRootModule, HttpClientModule],
      declarations: [AppComponent],
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    translocoService = TestBed.inject(TranslocoService);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("should navigate to home if Router url is '/'", function () {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    router.url = '/';
    const appComponent = new AppComponent(router, translocoService);
    expect(router.navigate).toHaveBeenCalledWith(['', 'home']);
  });
});
