import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoComponent } from './component/curso/curso.component';

import { CursoService } from './services/curso.service';
import { NewCursoComponent } from './component/new-curso/new-curso.component';



@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    NewCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [CursoService],
  bootstrap: [AppComponent],
  entryComponents:[NewCursoComponent]
})
export class AppModule { }
