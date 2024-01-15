import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DisplayedHeroes } from 'src/app/lib/interfaces/displayedHeroe.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  //SEARCH
  public searchForm!: FormGroup;
  public searchValue = '';
  @Output() search = new EventEmitter<DisplayedHeroes[]>();
  @Input() listOfDataRegisters!: DisplayedHeroes[];
  dataFilterRegisters!: DisplayedHeroes[];

  constructor(public fb: FormBuilder) {
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.dataFilterRegisters = this.listOfDataRegisters;
  }

  // CREATING FORMGROUPS
  createFormGroup(): void {
    this.searchForm = this.fb.group({
      searchValue: [''],
    });
  }

  searchHeroes(): void {
    this.listOfDataRegisters = this.dataFilterRegisters.filter(
      (item: any) =>
        item.name
          .toLowerCase()
          .includes(this.searchForm.value.searchValue.toLowerCase()) ||
        item.birth.includes(this.searchForm.value.searchValue.toLowerCase()) ||
        item.actor
          .toLowerCase()
          .includes(this.searchForm.value.searchValue.toLowerCase()) ||
        item.dateRegister
          .toLowerCase()
          .includes(this.searchForm.value.searchValue.toLowerCase())
    );

    this.search.emit(this.listOfDataRegisters);
  }
}
