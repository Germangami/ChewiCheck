import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  tgId?: number,
  first_name?: string,
  last_name?: string,
  username?: string,
  startDate?: string,
  endDate?: string,
  remainingTrainings?: number,
  totalTrainings?: number,
  type?: string,
  membershipType?: string
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'https://chewi-check.com/api';
  // API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  showUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/user`);
  }

  updateUser(data: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/user/update`, data);
  }

  markAttendance(tgId: number) {
    return this.http.put(`${this.API_URL}/user/updateTrainings`, { tgId });
  }
}
