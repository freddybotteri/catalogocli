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
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.scss']
})

export class NewTeacherComponent implements OnInit {

  addNewTeacherForm: FormGroup;
  categories: any[] = [];
  event: EventEmitter<any>=new EventEmitter();
  
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

  		this.addNewTeacherForm = this.builder.group({
	      name: new FormControl(null, [])
	    });
  }

  ngOnInit() {
  
  }


    onPostFormSubmit(){
    let postData = {
      'name': this.addNewTeacherForm.get('name').value
    };
    
    console.log(postData)
    this.profesorService.addTeacher(postData).subscribe(data=>{
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
