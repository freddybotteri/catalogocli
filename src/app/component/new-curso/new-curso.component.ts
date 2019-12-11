import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { map ,catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';

import { FileUploader ,FileItem,ParsedResponseHeaders} from 'ng2-file-upload';

import { Teacher } from 'src/app/models/Teacher';

@Component({
  selector: 'app-new-curso',
  templateUrl: './new-curso.component.html',
  styleUrls: ['./new-curso.component.scss']
})
export class NewCursoComponent implements OnInit {

  addNewCursoForm: FormGroup;
  categories: any[] = [];
  event: EventEmitter<any>=new EventEmitter();
  uploader: FileUploader = new FileUploader({ url: "http://localhost:9095/rest/files/upload", removeAfterUpload: false, autoUpload: true});
  dirtemario: String;



  profesorList: any[] = [];
  /**
  	cur_nid
    cur_vtitulo
    cur_nsts
    cur_vnivel
    cur_vhoras
    cur_vprofesor
    cur_fcatalogo
   */
  constructor(private builder: FormBuilder,
   			private cursoService: CursoService,
   			private profesorService: ProfesorService,
    		private bsModalRef: BsModalRef) { 

  		this.addNewCursoForm = this.builder.group({
	      title: new FormControl(null, []),
	      active: new FormControl('', []),
	      level: new FormControl('', []),
	      hours: new FormControl('', []),
	      teacher: new FormControl('', [])
	    });

    	this.uploader.onBeforeUploadItem = (item) => {
		  item.withCredentials = false;
		}

  }

  ngOnInit() {
  	this.profesorService.getProfesoresList().pipe(
      map(data => {

        let setTeacher = new Set(...this.profesorList, data);
        this.profesorList = Array.from(setTeacher);
        console.log(this.profesorList)
      }),
      catchError(err => {
        alert('Error in list of teacher.');
        return throwError(err);
      })
    ).toPromise();
  	
  	this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

    onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        let data = response; //success server response
        this.dirtemario = data;
        console.log(data);

    }

    onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        let error = response; //error server response
        alert("Archivo invalido solo PDF.");
    }

    onPostFormSubmit(){
    let postData = {
      'title': this.addNewCursoForm.get('title').value,
      'active': this.addNewCursoForm.get('active').value,
      'level': this.addNewCursoForm.get('level').value,
      'hours': this.addNewCursoForm.get('hours').value,
      'teacher': new Teacher(this.addNewCursoForm.get('teacher').value,""),
    };
    
    console.log(postData)
    this.cursoService.addCurso(postData).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }else{
      	this.event.emit('ERROR');
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
