import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormBuilder } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const mockedData = [
    {
      id: 1,
      name: 'Hero 1',
      birth: '2024-01-15',
      height: 180,
      weight: 80,
      actor: 'Actor 1',
      dateRegister: '2024-01-15',
    },
    {
      id: 2,
      name: 'oreH 2',
      birth: '2024-01-15',
      height: 170,
      weight: 70,
      actor: 'Actor 2',
      dateRegister: '2024-01-15',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoModule],
      declarations: [SearchComponent],
      providers: [FormBuilder, TranslocoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Search form is created successfully
  it('should create search form successfully', () => {
    const component = new SearchComponent(new FormBuilder());
    expect(component.searchForm).toBeDefined();
  });

  // Search value is initialized as an empty string
  it('should initialize search value as an empty string', () => {
    const component = new SearchComponent(new FormBuilder());
    expect(component.searchValue).toEqual('');
  });

  // List of data registers is assigned to dataFilterRegistros in ngOnInit
  it('should assign list of data registers to dataFilterRegistros in ngOnInit', () => {
    const component = new SearchComponent(new FormBuilder());
    component.listOfDataRegisters = [
      {
        id: 1,
        name: 'Hero 1',
        birth: new Date(),
        height: 180,
        weight: 80,
        actor: 'Actor 1',
        dateRegister: '2024-01-15',
      },
    ];
    component.ngOnInit();
    expect(component.dataFilterRegisters).toEqual(
      component.listOfDataRegisters
    );
  });

  // SearchHeroes function filters the list of data registers based on search value and emits the result
  it('should filter list of data registers based on search value and emit the result', () => {
    const component = new SearchComponent(new FormBuilder());
    component.listOfDataRegisters = mockedData;
    component.dataFilterRegisters = mockedData;
    component.searchForm.setValue({ searchValue: 'Hero' });
    component.searchHeroes();
    expect(component.listOfDataRegisters).toEqual([
      component.listOfDataRegisters[0],
    ]);
  });

  // Search value fails to be initialized
  it('should fail to initialize search value', () => {
    const component = new SearchComponent(new FormBuilder());
    expect(component.searchValue).not.toBeUndefined();
  });
});
