import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICharacteristics } from 'app/shared/model/characteristics.model';

type EntityResponseType = HttpResponse<ICharacteristics>;
type EntityArrayResponseType = HttpResponse<ICharacteristics[]>;

@Injectable({ providedIn: 'root' })
export class CharacteristicsService {
  public resourceUrl = SERVER_API_URL + 'api/characteristics';

  constructor(protected http: HttpClient) {}

  create(characteristics: ICharacteristics): Observable<EntityResponseType> {
    return this.http.post<ICharacteristics>(this.resourceUrl, characteristics, { observe: 'response' });
  }

  update(characteristics: ICharacteristics): Observable<EntityResponseType> {
    return this.http.put<ICharacteristics>(this.resourceUrl, characteristics, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICharacteristics>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICharacteristics[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
