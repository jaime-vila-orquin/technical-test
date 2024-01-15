import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sharedEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  // GET
  getHeroes(): Observable<any> {
    return this.http.get<any>(`${sharedEnvironment.apiUrl}/heroes`, {});
  }

  getHeroeDetail(id: number = 0): Observable<any> {
    return this.http.get<any>(`${sharedEnvironment.apiUrl}/heroes/${id}`, {});
  }

  // POST
  postNewHeroe(newHeroe: any) {
    // In case we need to format the dates before sending them to the server
    /* newHeroe.birth = this.datePipe.transform(newHeroe.birth, 'dd/MM/yyyy');
    newHeroe.dateRegister = this.datePipe.transform(
      newHeroe.dateRegister,
      'dd/MM/yyyy'
    );*/
    return this.http.post<any>(`${sharedEnvironment.apiUrl}/heroes`, newHeroe);
  }

  // DELETE
  deleteHeroe(id: number = 0): Observable<any> {
    return this.http.delete<any>(
      `${sharedEnvironment.apiUrl}/heroes/${id}`,
      {}
    );
  }

  // PUT
  updateHeroe(id: number, heroe: any): Observable<any> {
    // In case we need to format the dates before sending them to the server
    /* heroe.birth = this.datePipe.transform(heroe.birth, 'dd/MM/yyyy');
    heroe.dateRegister = this.datePipe.transform(
      heroe.dateRegister,
      'dd/MM/yyyy'
    ); */
    return this.http.put<any>(
      `${sharedEnvironment.apiUrl}/heroes/${id}`,
      heroe
    );
  }
}
