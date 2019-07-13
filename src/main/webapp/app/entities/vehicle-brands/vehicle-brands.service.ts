import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleBrands } from 'app/shared/model/vehicle-brands.model';

type EntityResponseType = HttpResponse<IVehicleBrands>;
type EntityArrayResponseType = HttpResponse<IVehicleBrands[]>;

@Injectable({ providedIn: 'root' })
export class VehicleBrandsService {
  public resourceUrl = SERVER_API_URL + 'api/vehicle-brands';

  constructor(protected http: HttpClient) {}

  create(vehicleBrands: IVehicleBrands): Observable<EntityResponseType> {
    return this.http.post<IVehicleBrands>(this.resourceUrl, vehicleBrands, { observe: 'response' });
  }

  update(vehicleBrands: IVehicleBrands): Observable<EntityResponseType> {
    return this.http.put<IVehicleBrands>(this.resourceUrl, vehicleBrands, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVehicleBrands>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVehicleBrands[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
