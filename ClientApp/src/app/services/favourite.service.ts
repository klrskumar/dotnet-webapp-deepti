import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }

  getFavourites(): Observable<any[]> {
    return this.http.get<any>(`${environment.apiUrl}/favourite/getAllFavouriteUsers`);
  }
  saveFavourite(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/favourite/saveFavouriteUser`, data);
  }
  updateFavourite(data, userId): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/favourite/updateFavouriteUser/${userId}`, data);
  }
  deleteFavourite(userId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/favourite/deleteFavouriteUser/${userId}`);
  }
}
