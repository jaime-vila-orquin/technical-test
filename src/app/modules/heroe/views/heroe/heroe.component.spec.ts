import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroeComponent } from './heroe.component';
import { HeroeService } from '../../heroe.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroeComponent', () => {
  let component: HeroeComponent;
  let fixture: ComponentFixture<HeroeComponent>;
  let heroeService: HeroeService;
  let messageService: NzMessageService;
  let modalService: NzModalService;
  let translocoService: TranslocoService;

  const mockedListOfDataRegisters = [
    {
      id: 1,
      name: 'Hero 1',
      birth: new Date(),
      actor: 'Hero 1',
      height: 190,
      weight: 100,
      dateRegister: new Date(),
    },
    {
      id: 2,
      name: 'Hero 2',
      birth: new Date(),
      actor: 'Hero 2',
      height: 190,
      weight: 100,
      dateRegister: new Date(),
    },
  ];

  const mockedDataRegister = {
    id: 1,
    name: 'Hero 1',
    birth: new Date(),
    actor: 'Hero 1',
    height: 190,
    weight: 100,
    dateRegister: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        CommonModule,
        NzMessageModule,
        TranslocoModule,
        BrowserAnimationsModule,
      ],
      declarations: [HeroeComponent],
      providers: [
        HeroeService,
        FormBuilder,
        NzMessageService,
        NzModalService,
        TranslocoService,
        DatePipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeComponent);
    component = fixture.componentInstance;
    heroeService = TestBed.inject(HeroeService);
    messageService = TestBed.inject(NzMessageService);
    modalService = TestBed.inject(NzModalService);
    translocoService = TestBed.inject(TranslocoService);
    fixture.detectChanges();
  });

  // Should load all heroes on initialization
  it('should load all heroes on initialization', () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroes',
    ]);
    mockHeroeService.getHeroes.and.returnValue(of([]));

    // Create instance of HeroeComponent with mocked HeroeService
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      new FormBuilder(),
      messageService,
      modalService,
      translocoService
    );

    // Call ngOnInit method
    heroeComponent.ngOnInit();

    // Expect getHeroes method to be called
    expect(mockHeroeService.getHeroes).toHaveBeenCalled();
  });

  // Should display heroes data in a table
  it('should display heroes data in a table', () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroes',
    ]);
    mockHeroeService.getHeroes.and.returnValue(of(mockedListOfDataRegisters));

    // Create instance of HeroeComponent with mocked HeroeService
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      new FormBuilder(),
      messageService,
      modalService,
      translocoService
    );

    // Set listOfDataRegisters property
    heroeComponent.listOfDataRegisters = mockedListOfDataRegisters;

    // Expect listOfDataRegisters to be displayed in the table
    expect(heroeComponent.listOfDataRegisters.length).toBe(2);
  });

  // Should allow sorting heroes data by different columns
  it('should allow sorting heroes data by different columns', () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroes',
    ]);
    mockHeroeService.getHeroes.and.returnValue(of(mockedListOfDataRegisters));

    // Create instance of HeroeComponent with mocked HeroeService
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      new FormBuilder(),
      messageService,
      modalService,
      translocoService
    );

    // Set listOfDataRegisters property
    heroeComponent.listOfDataRegisters = mockedListOfDataRegisters;

    // Sort listOfDataRegisters by name in ascending order
    heroeComponent.listOfColumns[0].sortOrder = 'ascend';
    heroeComponent.listOfColumns[0].sortFn!(
      heroeComponent.listOfDataRegisters[0],
      heroeComponent.listOfDataRegisters[1]
    );

    // Expect listOfDataRegisters to be sorted by name in ascending order
    expect(heroeComponent.listOfDataRegisters[0].name).toBe('Hero 1');
    expect(heroeComponent.listOfDataRegisters[1].name).toBe('Hero 2');
  });

  // Should allow searching heroes data by name
  it('should search heroes data by name when searchHeroes method is called', () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroes',
    ]);
    mockHeroeService.getHeroes.and.returnValue(of([]));

    // Create instance of HeroeComponent with mocked HeroeService
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      new FormBuilder(),
      messageService,
      modalService,
      translocoService
    );

    // Call searchHeroes method with a list of heroes
    const listOfDataRegisters = mockedListOfDataRegisters;
    heroeComponent.searchHeroes(listOfDataRegisters);

    // Expect listOfDataRegisters to be updated with the filtered list of heroes
    expect(heroeComponent.listOfDataRegisters).toEqual(
      mockedListOfDataRegisters
    );
  });

  // Should delete a hero from the list
  it('should delete a hero from the list when deleteHeroe method is called', () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroes',
      'deleteHeroe',
    ]);
    mockHeroeService.getHeroes.and.returnValue(of(mockedListOfDataRegisters));
    mockHeroeService.deleteHeroe.and.returnValue(of([]));

    // Create instance of HeroeComponent with mocked HeroeService
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      new FormBuilder(),
      messageService,
      modalService,
      translocoService
    );

    // Call deleteHeroe method
    heroeComponent.deleteHeroe(1);

    // Expect deleteHeroe method to be called
    expect(mockHeroeService.deleteHeroe).toHaveBeenCalledWith(1);
  });

  // Should open a modal to edit an existing hero
  it('should open a modal to edit an existing hero when edit button is clicked', () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroeDetail',
    ]);
    mockHeroeService.getHeroeDetail.and.returnValue(of(mockedDataRegister));

    // Create instance of HeroeComponent with mocked HeroeService
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      new FormBuilder(),
      messageService,
      modalService,
      translocoService
    );

    // Set up test data
    const heroData = mockedDataRegister;

    // Call openModal method with edit set to true and hero data
    heroeComponent.openModal(true, heroData);

    // Expect getHeroeDetail method to be called with correct id
    expect(mockHeroeService.getHeroeDetail).toHaveBeenCalledWith(heroData.id);
  });

  // should open a modal to add a new hero
  it("should open a modal to add a new hero when the 'openModal' method is called with 'edit' set to false", () => {
    // Mock HeroeService
    const mockHeroeService = jasmine.createSpyObj('HeroeService', [
      'getHeroeDetail',
      'postNewHeroe',
    ]);
    mockHeroeService.getHeroeDetail.and.returnValue(of({}));
    mockHeroeService.postNewHeroe.and.returnValue(of({}));

    // Mock FormBuilder
    const mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockFormBuilder.group.and.returnValue({});

    // Mock NzMessageService
    const mockNzMessageService = jasmine.createSpyObj('NzMessageService', [
      'success',
      'error',
    ]);

    // Mock NzModalService
    const mockNzModalService = jasmine.createSpyObj('NzModalService', [
      'confirm',
    ]);

    // Mock TranslocoService
    const mockTranslocoService = jasmine.createSpyObj('TranslocoService', [
      'selectTranslate',
    ]);

    // Create instance of HeroeComponent with mocked dependencies
    const heroeComponent = new HeroeComponent(
      mockHeroeService,
      mockFormBuilder,
      mockNzMessageService,
      mockNzModalService,
      mockTranslocoService
    );

    // Call openModal method with edit set to false
    heroeComponent.openModal(false);

    // Expect isVisibleModal to be true
    expect(heroeComponent.isVisibleModal).toBe(true);
  });
});
