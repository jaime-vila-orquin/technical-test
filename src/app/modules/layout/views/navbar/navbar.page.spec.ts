import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPage } from './navbar.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LayoutService } from '../../layout.service';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { AdvancedSearchService } from 'src/app/modules/advanced-search/advanced-search.service';
import { of } from 'rxjs';

describe('NavbarPage', () => {
  let component: NavbarPage;
  let fixture: ComponentFixture<NavbarPage>;
  let layoutService: LayoutService;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule, TranslocoModule],
      declarations: [NavbarPage],
      providers: [AdvancedSearchService, TranslocoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLanguages from layoutService upon initialization', function () {
    const layoutServiceSpy = spyOn(
      component.layoutService,
      'getLanguages'
    ).and.returnValue(of([]));
    component.ngOnInit();
    expect(layoutServiceSpy).toHaveBeenCalled();
  });

  it('should initialize isCollapsed to false', function () {
    const navbarPage = new NavbarPage(layoutService, translocoService);
    expect(navbarPage.isCollapsed).toBeFalse();
  });

  // If 'getLanguages' returns a list of languages, the method should map the list to an array of objects with 'value' and 'label' properties
  it('should map the list of languages to an array of objects with value and label properties', function () {
    const languages = [
      { lang: 'en', labelRecurso: 'English' },
      { lang: 'es', labelRecurso: 'Español' },
    ];
    spyOn(component.layoutService, 'getLanguages').and.returnValue(
      of(languages)
    );
    component.ngOnInit();
    expect(component.listOfLanguages).toEqual([
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
    ]);
  });
});
