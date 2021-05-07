import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-balance',
  templateUrl: './register-balance.component.html',
  styleUrls: ['./register-balance.component.css']
})
export class RegisterBalanceComponent implements OnInit {

  formData: FormGroup;
  user: any;
  id: any;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<RegisterBalanceComponent>
  ) {
    this.formData = this.builder.group({
      balance: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
  }


  setBalance(): void {
    this.userService.setBalance(this.id, this.formData.value).subscribe(
      (res: any) => {
        console.log(res);
        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err);
      }
    )

  }
}
