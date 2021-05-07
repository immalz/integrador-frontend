import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './Pages/perfil/perfil.component';
import { UpdateComponent } from './Pages/update/update.component';
import { EntryComponent } from './Pages/entry/entry.component';

const routes: Routes = [
  { 
    path: 'perfil',
    component: PerfilComponent,
    children: [
      {path: '', component: EntryComponent},
      {path: 'actualizar-datos', component: UpdateComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
