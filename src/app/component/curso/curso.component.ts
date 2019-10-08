import { Component, OnInit } from '@angular/core';

import { CursoService } from '../../services/curso.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { NewCursoComponent } from '../../component/new-curso/new-curso.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  cursoList: any[] = [];
  bsModalRef: BsModalRef;

  constructor(private cursoService: CursoService, private bsModalService: BsModalService) { }

  ngOnInit() {
  	this.getPosts();
  }


  getPosts() {
    this.cursoService.getCursoList().subscribe(data => {
      Object.assign(this.cursoList, data);
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }

  addNewPost() {
    this.bsModalRef = this.bsModalService.show(NewCursoComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.getPosts();
      }
    });
  }

  dowloadcatalogo(){

  }


}
