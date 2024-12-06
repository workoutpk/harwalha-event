import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Response } from '../interfaces/response';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    baseUrl:String;
    constructor(
        private http: HttpClient,
        ) { 
            this.baseUrl = environment.apiUrl;
        }

    send(url: string, item: Object): Observable<Object>{
        return this.http.post<Object>(`${this.baseUrl}${url}`, item);
    }
    getAll(url: string): Observable<Response[]> {
        return this.http.get<Response[]>(`${this.baseUrl}${url}`);
    }

    getById(url: string, id: number): Observable<Response> {
        return this.http.get<Response>(`${this.baseUrl}${url}/${id}`);
    }

    create(url: string, item: Object): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}${url}`, item);
    }

    update(url: string, item: Object): Observable<Response> {
        return this.http.put<Response>(`${this.baseUrl}${url}/${(item as any).id}`, item);
    }

    delete(url: string, id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}${url}/${id}`);
    }
}
