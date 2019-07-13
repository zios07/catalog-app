import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISteering } from 'app/shared/model/steering.model';

type EntityResponseType = HttpResponse<ISteering>;
type EntityArrayResponseType = HttpResponse<ISteering[]>;

@Injectable({ providedIn: 'root' })
export class SteeringService {
  public resourceUrl = SERVER_API_URL + 'api/steerings';

  constructor(protected http: HttpClient) {}

  create(steering: ISteering): Observable<EntityResponseType> {
    return this.http.post<ISteering>(this.resourceUrl, steering, { observe: 'response' });
  }

  update(steering: ISteering): Observable<EntityResponseType> {
    return this.http.put<ISteering>(this.resourceUrl, steering, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISteering>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISteering[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
