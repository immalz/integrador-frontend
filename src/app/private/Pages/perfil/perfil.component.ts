import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttachSession } from 'protractor/built/driverProviders';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  loading: boolean = true;
  id: any;
  user: any;

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser();
  }

  getUser(): any {
    this.userService.getUser(this.id).subscribe(
      (res: string) => {
        this.user = res;
        this.checkSession();
      }
    )
  }

  public checkSession(): void {
    if (this.user.username) {
      this.loading = false;
    } else {
      this._snackBar.open('¡No ha iniciado sesión!', 'cerrar');
    }
  }

}
