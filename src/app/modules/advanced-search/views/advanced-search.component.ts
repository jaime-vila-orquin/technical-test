import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ColumnItem } from 'src/app/lib/interfaces/columItem.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdvancedSearchService } from '../advanced-search.service';
import { DisplayedHeroes } from 'src/app/lib/interfaces/displayedHeroe.interface';

@Component({
  selector: 'advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnInit {
  //SEARCH/FILTERS
  public panels = [
    {
      active: true,
      icon: 'search',
    },
  ];
  public searchForm!: FormGroup;

  //TABLE
  public listOfColumns: ColumnItem[] = [
    {
      name: 'NOMBRE',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'NACIMIENTO',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.birth.localeCompare(b.birth),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'ALTURA',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.height - b.height,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'PESO',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.weight - b.weight,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'ACTOR',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.actor.localeCompare(b.actor),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'FECHA DE REGISTRO',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.dateRegister.localeCompare(b.dateRegister),
      sortDirections: ['ascend', 'descend', null],
    },
  ];
  public listOfDataRegisters!: DisplayedHeroes[];

  constructor(
    private advancedSearchService: AdvancedSearchService,
    public fb: FormBuilder,
    private msg: NzMessageService
  ) {
    this.createFormGroup();
  }

  ngOnInit(): void {}

  // FORMGROUP
  createFormGroup(): void {
    this.searchForm = this.fb.group({
      name: [null, [Validators.required]],
      actor: [null],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  // HTTP CALLS
  async getAllHeroes(name: string): Promise<void> {
    await this.advancedSearchService.getHeroes(name).then(
      (res: any) => {
        this.listOfDataRegisters = res;
      },
      (err: any) => {
        this.msg.error(err);
      }
    );
  }

  // FUNCTIONS
  advancedSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }
    this.getAllHeroes(this.titleCaseWord(this.searchForm.value.name));
  }

  titleCaseWord(word: string): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  // TABLE
  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }
}
