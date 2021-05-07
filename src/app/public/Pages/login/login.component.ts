import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.formLogin = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public signIn(): any {
    this.authService.signIn(this.formLogin.value).subscribe(
      (res: any) => {
        if (res['message']) {
          this._snackBar.open(res['message'], 'cerrar');
        } else {
          localStorage.setItem('user', JSON.stringify(res[0].id_user));
          this.router.navigate(['/perfil']);
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
