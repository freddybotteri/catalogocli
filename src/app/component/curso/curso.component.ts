import { Component, OnInit ,HostListener} from '@angular/core';

import { CursoService } from '../../services/curso.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";


import { NewCursoComponent } from '../../component/new-curso/new-curso.component';
import { NewTeacherComponent } from '../../component/new-teacher/new-teacher.component';
import { OrderPipe } from 'ngx-order-pipe';
import { map ,mergeMap,catchError,retry} from 'rxjs/operators';
import { throwError} from 'rxjs';




@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  cursoList: any[] = [];
  courseInfinite:any[] = [];

  pageCourseCounter:number = 1;

  bsModalRef: BsModalRef;

  bsModalTeacherRef: BsModalRef;

  order: string = 'titulo';
  reverse: boolean = false;
  sortedCollection: any[];
  p:any;
  constructor(private orderPipe: OrderPipe,private cursoService: CursoService, private bsModalService: BsModalService) {
  	this.sortedCollection = orderPipe.transform(this.cursoList, 'titulo');
   }

  ngOnInit() {
    this.pageCourseCounter = 0;
  	this.getPosts();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  getPosts() {
    this.cursoService.getCursoList(this.pageCourseCounter).pipe(
      map(data => {


        if(!data["empty"]){
            this.courseInfinite = Array.of(...this.courseInfinite,...data["content"]);
            console.log(this.courseInfinite)
            this.pageCourseCounter++;
        }
       
      }),
      catchError(err => {
        alert('Error in list of course.');
        return throwError(err);
      })
    ).toPromise();
  }


  

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event) {
    console.log(event)
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      //calert("you're at the bottom of the page");
      this.getPosts();
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])
  screenChange(event) {
    console.log(event);
  }

  

  addNewPost() {
    this.bsModalRef = this.bsModalService.show(NewCursoComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.getPosts();
      }else{
      	alert("Error al agregar.");
      }
    });
  }


  addNewTeacher() {
    this.bsModalTeacherRef = this.bsModalService.show(NewTeacherComponent);
    this.bsModalTeacherRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.getPosts();
      }else{
        alert("Error al agregar.");
      }
    });
  }


  editCourse(datacourse:any){
    this.bsModalRef = this.bsModalService.show(NewCursoComponent,{
      initialState: {
          dataCourseTowillUpdate:[{
          'id':datacourse.id,
          'title': datacourse.title,
          'active': datacourse.active,
          'level': datacourse.level,
          'hours': datacourse.hours,
          'teacher': datacourse.teacher.id
            
          }]
       }
    });
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.getPosts();
      }else{
        alert("Error al agregar.");
      }
    });
  }

  deleteCourse(id){

    var r = confirm("¿Desa eliminar el curso?");
    if (r == true) {
      this.cursoService.deleteCourse(id).pipe(
        retry(1),
        catchError(err => {
          alert('Error in delete course.');
          return throwError(err);
        })
      ).toPromise();
    } else {
      
    }
    
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
