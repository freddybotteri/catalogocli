import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject,Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursoService {

	private readonly baseURL: string;

    postIdSource = new  BehaviorSubject<number>(0);
    postIdData: any;

  constructor(private http: HttpClient) {

  		this.baseURL ="http://localhost:9095/courses";
        this.postIdData= this.postIdSource.asObservable();
         }

    getCursoList(pageCourseCounter:number){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL + "?page="+pageCourseCounter+"&size=10", { headers: header})
    }

    addCurso(curso: any){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL + "", curso, { headers: header})
    }

    updateCurso(curso: any){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.put(this.baseURL + "/Update", curso, { headers: header})
    }

    deleteCourse(id){
      let header = new HttpHeaders();
      header.append('Content-Type', 'applications/json');
      return this.http.delete(this.baseURL + "/delete/"+id, { headers: header})
    }



    getPDF(filename:string){   
		//const options = { responseType: 'blob' }; there is no use of this
		let header = new HttpHeaders();
        header.append('Content-Type', 'applications/pdf');
		let uri = this.baseURL+"pdf/get/" + filename;
		// this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
		return this.http.get(uri, { responseType: 'blob' });
	}
}
