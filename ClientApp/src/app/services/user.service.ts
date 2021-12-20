import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any>(`${environment.gitHubApiUrl}/users`);
        //return this.http.get<any>('assets/users.json');
    }
    getUser(userId): Observable<any> {
        return this.http.get<any>(`${environment.gitHubApiUrl}/users/${userId}`);
        //return this.http.get<any>('assets/user.json');
    }

    getRepos(userId): Observable<any> {
        return this.http.get<any>(`${environment.gitHubApiUrl}/users/${userId}/repos`);
        //return this.http.get<any>('assets/repos.json');
    }
}
