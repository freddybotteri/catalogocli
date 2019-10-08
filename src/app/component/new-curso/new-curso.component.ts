import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-curso',
  templateUrl: './new-curso.component.html',
  styleUrls: ['./new-curso.component.scss']
})
export class NewCursoComponent implements OnInit {

  addNewCursoForm: FormGroup;
  categories: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

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
    		private bsModalRef: BsModalRef) { 

  		this.addNewCursoForm = this.builder.group({
	      titulo: new FormControl(null, []),
	      sts: new FormControl('', []),
	      nivel: new FormControl('', []),
	      horas: new FormControl('', []),
	      profesor: new FormControl('', []),
	      catalogo: new FormControl('', [])
	    });
  }

  ngOnInit() {
  }

    onPostFormSubmit(){
    let postData = {
      'titulo': this.addNewCursoForm.get('titulo').value,
      'state': this.addNewCursoForm.get('sts').value,
      'nivel': this.addNewCursoForm.get('nivel').value,
      'numerohoras': this.addNewCursoForm.get('horas').value,
      'profesor': this.addNewCursoForm.get('profesor').value,
      'catalogo': this.addNewCursoForm.get('catalogo').value,
    };
  
    this.cursoService.addCurso(postData).subscribe(data=>{
      console.log(data);
      if(data!=null && data>0){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
