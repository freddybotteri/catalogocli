import { Component, OnInit } from '@angular/core';

import { CursoService } from '../../services/curso.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { NewCursoComponent } from '../../component/new-curso/new-curso.component';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  cursoList: any[] = [];
  bsModalRef: BsModalRef;

  order: string = 'titulo';
  reverse: boolean = false;
  sortedCollection: any[];

  constructor(private orderPipe: OrderPipe,private cursoService: CursoService, private bsModalService: BsModalService) {
  	this.sortedCollection = orderPipe.transform(this.cursoList, 'titulo');
   }

  ngOnInit() {
  	this.getPosts();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
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
