import { Heroe } from '../../../../lib/interfaces/heroe.interface';
import { HeroeService } from '../../heroe.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ColumnItem } from 'src/app/lib/interfaces/columItem.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslocoService } from '@ngneat/transloco';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DisplayedHeroes } from 'src/app/lib/interfaces/displayedHeroe.interface';

@Component({
  selector: 'heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
})
export class HeroeComponent implements OnInit {
  // MODAL Variables
  public isVisibleModal: boolean = false;
  public isConfirmLoading: boolean = false;
  public detalleSelected!: DisplayedHeroes;
  public edit!: boolean;
  public modalForm: FormGroup = this.fb.group({});
  private passwordVisible = false;
  private submitted = false;

  public isLoaded: boolean = false;

  //TABLE
  public listOfColumns: ColumnItem[] = [
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.birth.localeCompare(b.birth),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.height - b.height,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.weight - b.weight,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.actor.localeCompare(b.actor),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.dateRegister.localeCompare(b.dateRegister),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    },
  ];
  public listOfDataRegisters!: DisplayedHeroes[];

  constructor(
    private heroeService: HeroeService,
    public fb: FormBuilder,
    public msg: NzMessageService,
    public modal: NzModalService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.getAllHeroes();
    this.getCabecerasTranslate();
  }

  // CREATING FORMGROUPS

  createFormGroupModalDetalle(): void {
    this.modalForm = this.fb.group({
      dateRegister: [
        {
          value: this.detalleSelected?.dateRegister,
          disabled: true,
        },
      ],
      name: [
        {
          value: this.detalleSelected.name.toUpperCase(),
          disabled: false,
        },
      ],
      birth: [
        {
          value: this.detalleSelected.birth,
          disabled: false,
        },
      ],
      height: [
        {
          value: this.detalleSelected.height,
          disabled: false,
        },
      ],
      weight: [
        {
          value: this.detalleSelected.weight,
          disabled: false,
        },
      ],
      actor: [
        {
          value: this.detalleSelected.actor,
          disabled: false,
        },
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.modalForm.controls;
  }

  // HTTP CALLS
  getAllHeroes(): void {
    this.heroeService.getHeroes().subscribe(
      (res: any) => {
        this.listOfDataRegisters = res;
        this.isLoaded = true;
      },
      (err: any) => {
        this.msg.error('No se pudo cargar la información de la base de datos.');
      }
    );
  }

  handleOk(): void {
    if (this.modalForm.invalid) {
      return;
    }
    let heroe: Heroe;
    heroe = {
      name: this.modalForm.value.name,
      birth: this.modalForm.value.birth,
      height: this.modalForm.value.height,
      weight: this.modalForm.value.weight,
      actor: this.modalForm.value.actor,
      dateRegister: this.edit
        ? this.detalleSelected.dateRegister
        : this.modalForm.value.dateRegister,
    };
    this.submitted = true;
    this.isConfirmLoading = true;
    if (this.edit) {
      this.heroeService.updateHeroe(this.detalleSelected.id, heroe).subscribe(
        async () => {
          this.closeModal(true);
          this.getAllHeroes();
          this.msg.success(
            `Se han modificado correctamente los datos del héroe: ${this.modalForm.value.name.toUpperCase()}.`
          );
        },
        (err: any) => {
          this.closeModal(false);
          this.msg.error(
            `Hubo un problema al actualizar los datos del héroe: ${this.modalForm.value.name.toUpperCase()}. Inténtelo de nuevo.`
          );
        }
      );
    } else {
      this.heroeService.postNewHeroe(heroe).subscribe(
        () => {
          this.closeModal(true);
          this.getAllHeroes();
          this.msg.success(
            'Se ha añadido a la lista un nuevo héroe correctamente.'
          );
        },
        (err: any) => {
          this.closeModal(false);
          this.msg.error(
            'Hubo un problema al añadir el nuevo héroe a la lista. Inténtelo de nuevo'
          );
        }
      );
    }
  }

  closeModal(closeModal: boolean) {
    if (closeModal) {
      this.isConfirmLoading = false;
      this.isVisibleModal = false;
      this.submitted = false;
    } else {
      this.isConfirmLoading = false;
      this.submitted = false;
    }
  }

  async deleteHeroe(id: number) {
    this.heroeService.deleteHeroe(id).subscribe(
      () => {
        this.getAllHeroes();
        this.msg.success('Se ha eliminado de la lista un héroe correctamente.');
      },
      (err: any) => {
        this.msg.error(
          'Hubo un error al eliminar el héroe de la lista. Inténtelo de nuevo.'
        );
      }
    );
  }

  // FUNCTIONS
  async deleteConfirm(id: number): Promise<void> {
    this.modal.confirm({
      nzTitle: this.translocoService.translate('heroe.confirmModal.titulo'),
      nzOkText: this.translocoService.translate('heroe.confirmModal.okText'),
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteHeroe(id),
      nzCancelText: this.translocoService.translate(
        'heroe.confirmModal.noOkText'
      ),
      nzOnCancel: () => {},
    });
  }

  //search
  searchHeroes(listOfDataRegisters: DisplayedHeroes[]): void {
    this.listOfDataRegisters = listOfDataRegisters;
  }

  // TABLE
  //traducciones
  getCabecerasTranslate(): void {
    this.translocoService
      .selectTranslate('heroe.cabeceras.nombre')
      .subscribe(async (value) => {
        this.listOfColumns[0].name = value;
      });

    this.translocoService
      .selectTranslate('heroe.cabeceras.nacimiento')
      .subscribe(async (value) => {
        this.listOfColumns[1].name = value;
      });

    this.translocoService
      .selectTranslate('heroe.cabeceras.altura')
      .subscribe(async (value) => {
        this.listOfColumns[2].name = value;
      });

    this.translocoService
      .selectTranslate('heroe.cabeceras.peso')
      .subscribe(async (value) => {
        this.listOfColumns[3].name = value;
      });

    this.translocoService
      .selectTranslate('heroe.cabeceras.actor')
      .subscribe(async (value) => {
        this.listOfColumns[4].name = value;
      });

    this.translocoService
      .selectTranslate('heroe.cabeceras.fecha_alta')
      .subscribe(async (value) => {
        this.listOfColumns[5].name = value;
      });

    this.translocoService
      .selectTranslate('heroe.cabeceras.accion')
      .subscribe(async (value) => {
        this.listOfColumns[6].name = value;
      });
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  // MODAL DETAIL
  async openModal(edit: boolean, data?: any) {
    this.edit = edit;
    if (edit) {
      this.heroeService.getHeroeDetail(data.id).subscribe((data) => {
        this.detalleSelected = data;
        this.createFormGroupModalDetalle();
        this.isVisibleModal = true;
      });
    } else {
      this.modalForm = this.fb.group({
        dateRegister: [new Date()],
        name: [null, [Validators.required]],
        birth: [null, [Validators.required]],
        height: [null, [Validators.required]],
        weight: [null, [Validators.required]],
        actor: [null, [Validators.required]],
      });
      this.isVisibleModal = true;
    }
  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }
}
