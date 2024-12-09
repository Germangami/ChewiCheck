import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:5000/api/posts'

  constructor(private http: HttpClient) { }

  createNewUser(data: any) {
    return this.http.post(`${this.API_URL}`, data)
  }
}
