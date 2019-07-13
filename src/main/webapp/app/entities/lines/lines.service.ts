import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILines } from 'app/shared/model/lines.model';

type EntityResponseType = HttpResponse<ILines>;
type EntityArrayResponseType = HttpResponse<ILines[]>;

@Injectable({ providedIn: 'root' })
export class LinesService {
  public resourceUrl = SERVER_API_URL + 'api/lines';

  constructor(protected http: HttpClient) {}

  create(lines: ILines): Observable<EntityResponseType> {
    return this.http.post<ILines>(this.resourceUrl, lines, { observe: 'response' });
  }

  update(lines: ILines): Observable<EntityResponseType> {
    return this.http.put<ILines>(this.resourceUrl, lines, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILines>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILines[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
