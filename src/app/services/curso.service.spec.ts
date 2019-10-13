import { TestBed } from '@angular/core/testing';

import { CursoService } from './curso.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CursoService', () => {

	let cursoService: CursoService; 

  beforeEach(() => {TestBed.configureTestingModule({providers: [CursoService],imports: [HttpClientTestingModule]}) 
  		cursoService = TestBed.get(CursoService); 
  	});

  it('should be created', () => {
    const service: CursoService = TestBed.get(CursoService);
    expect(service).toBeTruthy();
  });

    // Add tests for all() method


	    it('should return a collection of cursos', () => {
	      const cursoResponse = [
	        {
	          id: '1',
	          titulo: 'java',
	          nivel: 'Basico',
	          status: '1'
	        },
	        {
	          id: '2',
	          titulo: 'PHP',
	          nivel: 'Intermedio',
	          status: '1'
	        }
	      ];
	      let response;
	      spyOn(cursoService, 'getCursoList').and.returnValue(of(cursoResponse));

	      cursoService.getCursoList().subscribe(res => {
	        response = res;
	      });
	      expect(response).toEqual(cursoResponse);
	    });



});
