import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  first_name: string;
  last_name: string;
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://13.61.52.64:5000/api';

  constructor(private http: HttpClient) { }

  showUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/user`);
  }
}
