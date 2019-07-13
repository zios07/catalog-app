import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICrossReference } from 'app/shared/model/cross-reference.model';

type EntityResponseType = HttpResponse<ICrossReference>;
type EntityArrayResponseType = HttpResponse<ICrossReference[]>;

@Injectable({ providedIn: 'root' })
export class CrossReferenceService {
  public resourceUrl = SERVER_API_URL + 'api/cross-references';

  constructor(protected http: HttpClient) {}

  create(crossReference: ICrossReference): Observable<EntityResponseType> {
    return this.http.post<ICrossReference>(this.resourceUrl, crossReference, { observe: 'response' });
  }

  update(crossReference: ICrossReference): Observable<EntityResponseType> {
    return this.http.put<ICrossReference>(this.resourceUrl, crossReference, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrossReference>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrossReference[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
