import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmountService } from '../../services/amount.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  formData: FormGroup;
  id: any;
  textMode: string = 'Agregar Monto'
  public mode: string = '';
  public dataAmount: any = [];

  constructor(
    private _snackBar: MatSnackBar,
    private builder: FormBuilder,
    private amountService: AmountService,
    public dialogRef: MatDialogRef<AddDataComponent>

  ) {
    this.formData = this.builder.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    
    this.mode !== 'create' ? this.setAmount() : null;
  }

  setAmount(): any {

    this.textMode = 'Actualizar Monto';

    this.formData.patchValue({
      name: this.dataAmount.name,
      amount: this.dataAmount.amount,
      type: String(this.dataAmount.id_state)
    });
  }

  updateAmount(): void {
    const payload = {
      name: this.formData.get('name')?.value,
      amount: this.formData.get('amount')?.value,
      id_state: Number(this.formData.get('type')?.value),
      id_user: this.id
    }
    this.amountService.updateAmount(payload, this.dataAmount.id_amount).subscribe(
      (res: any) => {
        this._snackBar.open(res['message'], 'cerrar');
        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }


  saveAmount(): any {

    const payload = {
      name: this.formData.get('name')?.value,
      amount: this.formData.get('amount')?.value,
      id_state: this.formData.get('type')?.value,
      id_user: this.id
    }
    this.amountService.createAmount(payload).subscribe(
      (res: any) => {
        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err);
      }
    )

  }

}
