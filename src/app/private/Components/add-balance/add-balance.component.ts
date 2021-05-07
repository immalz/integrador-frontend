import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmountService } from '../../services/amount.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {

  formData: FormGroup;
  id: number = 0;
  alert: any = null;

  constructor(
    private builder: FormBuilder,
    private amountService: AmountService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddBalanceComponent>
  ) { 
    this.formData = this.builder.group({
      alert: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(JSON.parse(localStorage.getItem('user') || '{}'));

    alert !== null ? this.setValues() : null;
  }

  setValues(): any {
    this.formData.get('alert')?.setValue(this.alert);
  }

  saveAlert(): any {
    this.userService.setAlert(this.id, this.formData.value).subscribe(
      (res: any) => {
        this._snackBar.open(res['message'], 'cerrar');
        this.dialogRef.close();
      },
      (err: any) => {
         console.log(err);
       }
    )
  }

}
