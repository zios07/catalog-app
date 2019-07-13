import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleModels } from 'app/shared/model/vehicle-models.model';

type EntityResponseType = HttpResponse<IVehicleModels>;
type EntityArrayResponseType = HttpResponse<IVehicleModels[]>;

@Injectable({ providedIn: 'root' })
export class VehicleModelsService {
  public resourceUrl = SERVER_API_URL + 'api/vehicle-models';

  constructor(protected http: HttpClient) {}

  create(vehicleModels: IVehicleModels): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicleModels);
    return this.http
      .post<IVehicleModels>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vehicleModels: IVehicleModels): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicleModels);
    return this.http
      .put<IVehicleModels>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVehicleModels>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVehicleModels[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(vehicleModels: IVehicleModels): IVehicleModels {
    const copy: IVehicleModels = Object.assign({}, vehicleModels, {
      startProduction:
        vehicleModels.startProduction != null && vehicleModels.startProduction.isValid()
          ? vehicleModels.startProduction.format(DATE_FORMAT)
          : null,
      finishProduction:
        vehicleModels.finishProduction != null && vehicleModels.finishProduction.isValid()
          ? vehicleModels.finishProduction.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startProduction = res.body.startProduction != null ? moment(res.body.startProduction) : null;
      res.body.finishProduction = res.body.finishProduction != null ? moment(res.body.finishProduction) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vehicleModels: IVehicleModels) => {
        vehicleModels.startProduction = vehicleModels.startProduction != null ? moment(vehicleModels.startProduction) : null;
        vehicleModels.finishProduction = vehicleModels.finishProduction != null ? moment(vehicleModels.finishProduction) : null;
      });
    }
    return res;
  }
}
