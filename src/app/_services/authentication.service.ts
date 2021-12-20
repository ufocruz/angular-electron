import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        const data = localStorage.getItem('data');
        const subjectData = data ? JSON.parse(data) : '';
        this.currentUserSubject = new BehaviorSubject<any>(subjectData);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(usuario: string, senha: string) {
        return this.http.post<any>(`${environment.apiHost}login`, { usuario, senha })
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', response.token);
                localStorage.setItem('data', JSON.stringify(response.dados));
                localStorage.setItem('hr_alerta', moment().format());
                localStorage.setItem('alertas', JSON.stringify(response.dados.alertas));

                this.currentUserSubject.next(response.dados);
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}
