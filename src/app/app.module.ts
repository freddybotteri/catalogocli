import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoComponent } from './component/curso/curso.component';

import { CursoService } from './services/curso.service';
import { ProfesorService } from './services/profesor.service';

import { NewCursoComponent } from './component/new-curso/new-curso.component';

import { NewTeacherComponent } from './component/new-teacher/new-teacher.component';


import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { NgxFileUploadModule } from "@r-hannuschka/ngx-fileupload";
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    NewCursoComponent,
    NewTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    OrderModule,
    NgxFileUploadModule,
    FileUploadModule
  ],
  providers: [CursoService,ProfesorService],
  bootstrap: [AppComponent],
  entryComponents:[NewCursoComponent,NewTeacherComponent]
})
export class AppModule { }
