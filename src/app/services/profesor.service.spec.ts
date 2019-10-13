import { TestBed } from '@angular/core/testing';

import { ProfesorService } from './profesor.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProfesorService', () => {

	let profesorService: ProfesorService; 

  beforeEach(() => {TestBed.configureTestingModule({providers: [ProfesorService],imports: [HttpClientTestingModule]}) 
  		profesorService = TestBed.get(ProfesorService); 
  	});

  it('should be created', () => {
    const service: ProfesorService = TestBed.get(ProfesorService);
    expect(service).toBeTruthy();
  });


	    it('should return a collection of profesor', () => {
	      const profesorResponse = [
	        {
	          id: '1',
	          Nombre: 'Nombre',
	          Apellido: 'Basico'
	        },
	        {
	          id: '2',
	          Nombre: 'Nombre',
	          Apellido: 'Basico'
	        }
	      ];
	      let response;
	      spyOn(profesorService, 'getProfesoresList').and.returnValue(of(profesorResponse));

	      profesorService.getProfesoresList().subscribe(res => {
	        response = res;
	      });
	      expect(response).toEqual(profesorResponse);
	    });



});
