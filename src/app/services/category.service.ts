import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL = 'https://6439e6a9bd3623f1b9a9bc77.mockapi.io/api/v1/category'
  // baseURL: string = '/assets/data/category-data.json';

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL);
  }
}
