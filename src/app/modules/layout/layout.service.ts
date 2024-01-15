import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sharedEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}

  // GET
  getLanguages(): Observable<any> {
    return this.http.get<any>(`${sharedEnvironment.apiUrl}/languages`, {});
  }
}
