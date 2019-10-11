import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { FileUploader ,FileItem,ParsedResponseHeaders} from 'ng2-file-upload';

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
	      titulo: new FormControl(null, []),
	      sts: new FormControl('', []),
	      nivel: new FormControl('', []),
	      horas: new FormControl('', []),
	      profesor: new FormControl('', []),
	      catalogo: new FormControl('', [])
	    });

    	this.uploader.onBeforeUploadItem = (item) => {
		  item.withCredentials = false;
		}

		



  }

  ngOnInit() {
  	this.profesorService.getProfesoresList().subscribe(data => {
      Object.assign(this.profesorList, data);
    }, error => {
      console.log("Error...", error);
    });
  	
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
        alert("Archivo invalido.");
    }

    onPostFormSubmit(){
    let postData = {
      'titulo': this.addNewCursoForm.get('titulo').value,
      'state': this.addNewCursoForm.get('sts').value,
      'nivel': this.addNewCursoForm.get('nivel').value,
      'numerohoras': this.addNewCursoForm.get('horas').value,
      'profesor': this.addNewCursoForm.get('profesor').value,
      'catalogo': this.dirtemario,
    };
  
    this.cursoService.addCurso(postData).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
