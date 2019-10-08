import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoComponent } from './component/curso/curso.component';

const routes: Routes = [
  { path: '',component: CursoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
