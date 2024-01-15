import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvancedSearchComponent } from './advanced-search.component';
import { AdvancedSearchService } from '../advanced-search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

describe('AdvancedSearchComponent', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;
  let advancedSearchService: AdvancedSearchService;
  let messageService: NzMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedSearchComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        NzMessageModule,
        TranslocoModule,
      ],
      providers: [
        AdvancedSearchService,
        FormBuilder,
        NzMessageService,
        TranslocoService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup on initialization', function () {
    const component = new AdvancedSearchComponent(
      advancedSearchService,
      new FormBuilder(),
      messageService
    );
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm instanceof FormGroup).toBe(true);
  });

  it('should have a listOfColumns array with predefined columns for the table', function () {
    const component = new AdvancedSearchComponent(
      advancedSearchService,
      new FormBuilder(),
      messageService
    );
    expect(component.listOfColumns).toBeDefined();
    expect(component.listOfColumns.length).toBeGreaterThan(0);
  });

  it('should not call getAllHeroes if the form is invalid', function () {
    const component = new AdvancedSearchComponent(
      advancedSearchService,
      new FormBuilder(),
      messageService
    );
    spyOn(component, 'getAllHeroes');
    component.searchForm.controls['name'].setValue(null);
    component.advancedSearch();
    expect(component.getAllHeroes).not.toHaveBeenCalled();
  });
});
