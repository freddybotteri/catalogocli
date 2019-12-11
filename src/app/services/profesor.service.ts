import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject,Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

	private readonly baseURL: string;

    postIdSource = new  BehaviorSubject<number>(0);
    postIdData: any;

  constructor(private http: HttpClient) {

  		this.baseURL ="http://localhost:9095/";
        this.postIdData= this.postIdSource.asObservable();
         }

    getProfesoresList(){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "teachers", { headers: header})
    }    

    addTeacher(teacherData:any){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL + "/add", teacherData, { headers: header})
    }  
}
