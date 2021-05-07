import { AddDataComponent } from './../../Components/add-data/add-data.component';
import { OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RegisterBalanceComponent } from '../../Components/register-balance/register-balance.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { UserService } from '../../services/user.service';
import { AmountService } from '../../services/amount.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBalanceComponent } from '../../Components/add-balance/add-balance.component';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';

interface jsPDFWidthPlugin extends jsPDF {
  autoTable : (options: UserOptions) => jsPDF;
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})

export class EntryComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id', 'name', 'progress', 'estado', 'color', 'actualizar', 'eliminar'];
  dataSource: MatTableDataSource<UserData>;
  id: any;
  user: any = [];
  amounts: any = [];
  
  // balance_entries = 0;
  // balance_outflow = 0;

  /*-------------------*/
  expenses = [];
  entries = [];
  balance: number = 0;
  totalExpenses = 0;
  totalEntries = 0;
  alert: boolean = false;
  /*-------------------*/

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private perfil: PerfilComponent,
    private userService: UserService,
    private amountService: AmountService,
    private _snackBar: MatSnackBar
  ) { 
    this.dataSource = new MatTableDataSource(this.amounts);
  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser();
    this.getAmounts();
  }

  getUser(): any {
    this.userService.getUser(this.id).subscribe(
      (res: string) => {
        this.user = res;
        this.checkUserBalance();
      }
    )
  }

  public getAmounts(): any {
    this.amountService.getAmounts(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.amounts = res;
        this.dataSource.data = res.reverse();
        this.separateAmount(res);
      }
    )
  }

  public separateAmount(amounts: any): any {
    this.expenses = amounts.filter((element: { id_state: number; }) => element.id_state === 1);
    this.entries = amounts.filter((element: { id_state: number; }) => element.id_state === 2);

    this.totalExpenses = 0;
    this.totalEntries = 0;

    this.expenses.forEach((numero) => {
      this.totalExpenses += numero['amount'];
    });

    this.entries.forEach((numero) => {
      this.totalEntries += numero['amount'];
    });

    this.balance = this.user.balance - this.totalExpenses + this.totalEntries;

    this.checkAlertAmount();
  }

  public checkUserBalance(): void {
    if (this.user.balance === null) {
      this.dialog.open(RegisterBalanceComponent, { disableClose: true });
    }
  }

  public addModal(mode: string, row? : any): void {
    let dialogRef = this.dialog.open(AddDataComponent);

    mode === 'create' ? dialogRef.componentInstance.mode = 'create' : dialogRef.componentInstance.dataAmount = row

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.perfil.ngOnInit();
    })
  }

  public addAlert(): any {
    let dialogRef = this.dialog.open(AddBalanceComponent);
    dialogRef.componentInstance.alert = this.user.alert;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.perfil.ngOnInit();
    })
  }

  checkAlertAmount(): any {
      console.log(this.user);
      if (this.balance <= this.user.alert) {
          this.alert = true;
      } else if (this.balance >= this.user.alert) {
        this.alert = false;
      }
  }

  deleteAmount(id: any): any {
    console.log(id);
    this.amountService.deleteAmount(id).subscribe(
      (res: any) => {
        console.log(res);
        this._snackBar.open(res['message'], 'cerrar');
        this.ngOnInit();
      }
    )
  }

  exportExcel(): void {
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWidthPlugin;
    doc.text('Reporte de Finanzas', 180, 20);
    let body: any = [];
    this.amounts.forEach((element: any) => {
      let value = '';
      let amount = 'S/ ' + element.amount + '.00';
      element.id_state === 1 ? value = 'Gasto' : value = 'Ingreso';
      let temp = [element.id_amount, element.name, amount , value, new Date(element.created_at).toLocaleDateString()];
      body.push(temp);
    });

    doc.autoTable({
      head: [['ID', 'Nombre', 'Monto Asignado', 'Tipo de Monto', 'Fecha de Registro']],
      body: body,

    })
    // doc.autoTable(col, body);
    doc.save('Reporte de Ingresos.pdf');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
