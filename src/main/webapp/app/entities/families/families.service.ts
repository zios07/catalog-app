import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFamilies } from 'app/shared/model/families.model';

type EntityResponseType = HttpResponse<IFamilies>;
type EntityArrayResponseType = HttpResponse<IFamilies[]>;

@Injectable({ providedIn: 'root' })
export class FamiliesService {
  public resourceUrl = SERVER_API_URL + 'api/families';

  constructor(protected http: HttpClient) {}

  create(families: IFamilies): Observable<EntityResponseType> {
    return this.http.post<IFamilies>(this.resourceUrl, families, { observe: 'response' });
  }

  update(families: IFamilies): Observable<EntityResponseType> {
    return this.http.put<IFamilies>(this.resourceUrl, families, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFamilies>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFamilies[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
