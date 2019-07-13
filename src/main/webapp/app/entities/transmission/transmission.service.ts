import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransmission } from 'app/shared/model/transmission.model';

type EntityResponseType = HttpResponse<ITransmission>;
type EntityArrayResponseType = HttpResponse<ITransmission[]>;

@Injectable({ providedIn: 'root' })
export class TransmissionService {
  public resourceUrl = SERVER_API_URL + 'api/transmissions';

  constructor(protected http: HttpClient) {}

  create(transmission: ITransmission): Observable<EntityResponseType> {
    return this.http.post<ITransmission>(this.resourceUrl, transmission, { observe: 'response' });
  }

  update(transmission: ITransmission): Observable<EntityResponseType> {
    return this.http.put<ITransmission>(this.resourceUrl, transmission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransmission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransmission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
