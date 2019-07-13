import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INationalities } from 'app/shared/model/nationalities.model';

type EntityResponseType = HttpResponse<INationalities>;
type EntityArrayResponseType = HttpResponse<INationalities[]>;

@Injectable({ providedIn: 'root' })
export class NationalitiesService {
  public resourceUrl = SERVER_API_URL + 'api/nationalities';

  constructor(protected http: HttpClient) {}

  create(nationalities: INationalities): Observable<EntityResponseType> {
    return this.http.post<INationalities>(this.resourceUrl, nationalities, { observe: 'response' });
  }

  update(nationalities: INationalities): Observable<EntityResponseType> {
    return this.http.put<INationalities>(this.resourceUrl, nationalities, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INationalities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INationalities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
