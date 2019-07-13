import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParts } from 'app/shared/model/parts.model';

type EntityResponseType = HttpResponse<IParts>;
type EntityArrayResponseType = HttpResponse<IParts[]>;

@Injectable({ providedIn: 'root' })
export class PartsService {
  public resourceUrl = SERVER_API_URL + 'api/parts';

  constructor(protected http: HttpClient) {}

  create(parts: IParts): Observable<EntityResponseType> {
    return this.http.post<IParts>(this.resourceUrl, parts, { observe: 'response' });
  }

  update(parts: IParts): Observable<EntityResponseType> {
    return this.http.put<IParts>(this.resourceUrl, parts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
