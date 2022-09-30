import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formatISO } from 'date-fns';
import { TicketService } from 'src/app/services/ticket.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  loading: boolean = false;
  validateForm!: FormGroup;
  validateFormHistorial!: FormGroup;
  dateFormat = 'yyyy/MM/dd';
  detailsFromGrup!: FormGroup;
  idManual: any;
  value?: string;
  showFormHistorial: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private message: NzMessageService
  ) {}

  get details(): any {
    return this.validateFormHistorial.get('details') as FormArray;
  }

  addStep(id: any): void {
    this.detailsFromGrup = this.fb.group({
      descripcion: [null, Validators.compose([Validators.maxLength(100)])],
    });
    this.details.push(this.detailsFromGrup);
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      persona_solicitante: [null, [Validators.required]],

      fecha_ingreso: [null],
      asunto: [null, [Validators.required]],
      descripcion: [null, [Validators.maxLength(150)]],
    });

    this.validateFormHistorial = this.fb.group({
      usuario_soporte: [null],
      comentario: [null],
      fecha_atencion: [null],

      details: this.fb.array([
        this.fb.group({
          descripcion: [null, Validators.compose([Validators.maxLength(150)])],
        }),
      ]),
    });

    this.validateForm.patchValue({
      fecha_ingreso: new Date(),
    });

    //desabilitar campos de validateFormHistorial
    this.validateFormHistorial.controls['fecha_atencion'].disable();

    this.validateFormHistorial.patchValue({
      //adjuntar fecha convertida a string

      fecha_atencion: formatISO(new Date(), {
        representation: 'date',
      }),
    });
  }

  back(): void {
    this.router.navigate([`/admin`]);
  }

  submitForm(): void {
    if (this.validateForm.valid && this.validateFormHistorial.valid) {
      this.addTicket(this.validateForm.value, this.validateFormHistorial.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      Object.values(this.validateFormHistorial.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      if (this.validateFormHistorial.controls['details'].invalid) {
        for (let i = 0; i < this.details.length; i++) {
          this.details.at(i).get('descripcion').markAsDirty();
          this.details.at(i).get('descripcion').updateValueAndValidity({
            onlySelf: true,
          });
        }
      }
    }
  }

  addTicket(formData: any, formDataHistorial: any): void {
    if (
      formData.fecha_ingreso != null &&
      typeof formData.fecha_ingreso == 'object'
    ) {
      formData.fecha_ingreso = formatISO(formData.fecha_ingreso, {
        representation: 'date',
      });
    }

    if (this.showFormHistorial) {
      formData.historial = formDataHistorial;
    }
    console.log(formData);

    this.loading = true;
    this.ticketService.addTicket(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.message.success('Ticket creado con éxito');
        this.router.navigate([`/admin`]);
      },
      error: (err) => {
        this.loading = false;
        this.message.error(err.error.message || JSON.stringify(err.error));
      },
    });
  }

  showModalHistorial(): void {
    this.showFormHistorial = true;
    //hacer requerido los campos de validateFormHistorial
    this.validateFormHistorial.controls['usuario_soporte'].setValidators([
      Validators.required,
    ]);
    //hacer requerido details descripcion de validateFormHistorial
    this.details.controls[0]
      .get('descripcion')
      .setValidators([Validators.required]);
  }
  ocultarlHistorial(): void {
    this.validateFormHistorial.controls['usuario_soporte'].clearValidators();
    //quitar requerido de todos los details descripcion de validateFormHistorial

    this.details.controls[0].get('descripcion').clearValidators();
    this.showFormHistorial = false;
    //reset form validateFormHistorial
    this.validateFormHistorial.reset();
    //quitar requerido los campos de validateFormHistorial

    //elimianar los details generados menos 1

    this.details.clear();
    this.addStep(0);

    //quitar requerido details descripcion de detailFormGrup

    this.detailsFromGrup.controls['descripcion'].clearValidators();

    this.details.controls[0].get('descripcion').clearValidators();
  }
}
