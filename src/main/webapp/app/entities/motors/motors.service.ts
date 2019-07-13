import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMotors } from 'app/shared/model/motors.model';

type EntityResponseType = HttpResponse<IMotors>;
type EntityArrayResponseType = HttpResponse<IMotors[]>;

@Injectable({ providedIn: 'root' })
export class MotorsService {
  public resourceUrl = SERVER_API_URL + 'api/motors';

  constructor(protected http: HttpClient) {}

  create(motors: IMotors): Observable<EntityResponseType> {
    return this.http.post<IMotors>(this.resourceUrl, motors, { observe: 'response' });
  }

  update(motors: IMotors): Observable<EntityResponseType> {
    return this.http.put<IMotors>(this.resourceUrl, motors, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotors>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotors[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
