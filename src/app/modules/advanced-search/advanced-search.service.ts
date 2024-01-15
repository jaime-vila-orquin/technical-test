import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sharedEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvancedSearchService {
  constructor(private http: HttpClient) {}

  // GET
  async getHeroes(searchParameters: string): Promise<any> {
    return this.http
      .get<any>(`${sharedEnvironment.apiUrl}/heroes?q=${searchParameters}`, {})
      .toPromise();
  }
}
