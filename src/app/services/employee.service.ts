import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL: string = 'https://6439e6a9bd3623f1b9a9bc77.mockapi.io/api/v1/employee'
  // baseURL: string = './assets/data/employee-data.json';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL);
  }

  add(employee: Employee): Observable<void> {
    return this.http.post<void>(`${this.baseURL}`, employee)
  }

}
