import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class FamilyChartService {

  constructor(private http: HttpClient) { }

  getFamily(): Observable<any> {
    const token = localStorage.getItem('id_token')?? ''
    const user: any = jwt_decode(token)

    return this.http.get<any>(`${environment.webApi}/family/${user.sub}`)
  }

  refreshMembers(): Observable<any> {
    const token = localStorage.getItem('id_token')?? ''
    const user: any = jwt_decode(token)

    return this.http.get<any>(`${environment.webApi}/family/${user.sub}/members`)
  }

  updateFamily(familyId: string, member: any): Observable<any> {
    return this.http.put<any>(`${environment.webApi}/family/${familyId}`, member)
  }

  getCardFormOptions(): Observable<any> {
    return this.http.get<any>(`${environment.webApi}/options/cardform`)
  }
}
