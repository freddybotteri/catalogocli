import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursoService {

	private readonly baseURL: string;

    postIdSource = new  BehaviorSubject<number>(0);
    postIdData: any;

  constructor(private http: HttpClient) {

  		this.baseURL ="http://localhost:9095/rest/";
        this.postIdData= this.postIdSource.asObservable();
         }

    getCursoList(){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "course", { headers: header})
    }

     addCurso(curso: any){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL + "course", curso, { headers: header})
    }
}
