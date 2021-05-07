import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  user: any = [];
  id: number | any = null;
  hide = true;
  userForm: FormGroup;
  edit: boolean = true;
  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private builder: FormBuilder,
    private sidebar: SidebarComponent
  ) {
    this.userForm = this.builder.group({
      username: ['', Validators.required],
      email: [null, Validators.email],
      password: [null, Validators.required],
      image: [null],
    });
   }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser();
    this.editMode();
  }

  editMode(): any {
    if (this.edit) {
      this.userForm.controls['username'].disable();
      this.userForm.controls['email'].disable();
      this.userForm.controls['password'].disable();
      this.userForm.controls['image'].disable();
    } else {
      this.userForm.controls['username'].enable();
      this.userForm.controls['email'].enable();
      this.userForm.controls['password'].enable();
      this.userForm.controls['image'].enable();
    }
  }

  updateUser(): any {
    this.userService.updateUser(this.userForm.value, this.id).subscribe( 
      (res: any) => {
        this._snackBar.open(res['message'], 'cerrar');
        this.ngOnInit();
        this.edit = true;
        this.editMode();
        this.sidebar.ngOnInit();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getUser(): any {
    this.userService.getUser(this.id).subscribe(
      (res: string) => {
        console.log(res);
        this.user = res;
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          image: this.user.image
        })
      }
    )
  }

}
