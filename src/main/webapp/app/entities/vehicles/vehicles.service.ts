import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicles } from 'app/shared/model/vehicles.model';

type EntityResponseType = HttpResponse<IVehicles>;
type EntityArrayResponseType = HttpResponse<IVehicles[]>;

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  public resourceUrl = SERVER_API_URL + 'api/vehicles';

  constructor(protected http: HttpClient) {}

  create(vehicles: IVehicles): Observable<EntityResponseType> {
    return this.http.post<IVehicles>(this.resourceUrl, vehicles, { observe: 'response' });
  }

  update(vehicles: IVehicles): Observable<EntityResponseType> {
    return this.http.put<IVehicles>(this.resourceUrl, vehicles, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVehicles>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVehicles[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
