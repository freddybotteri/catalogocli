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

  public showPDF(filename): void {
    this.cursoService.getPDF(filename)
        .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(x);

            var link = document.createElement('a');
            link.href = data;
            link.download = filename;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
}


}
