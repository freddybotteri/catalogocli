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

  		this.baseURL ="http://localhost:9095/rest/";
        this.postIdData= this.postIdSource.asObservable();
         }

    getProfesoresList(){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "profesor", { headers: header})
    }    
}
