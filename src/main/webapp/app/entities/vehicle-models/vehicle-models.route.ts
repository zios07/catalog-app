import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleModels } from 'app/shared/model/vehicle-models.model';
import { VehicleModelsService } from './vehicle-models.service';
import { VehicleModelsComponent } from './vehicle-models.component';
import { VehicleModelsDetailComponent } from './vehicle-models-detail.component';
import { VehicleModelsUpdateComponent } from './vehicle-models-update.component';
import { VehicleModelsDeletePopupComponent } from './vehicle-models-delete-dialog.component';
import { IVehicleModels } from 'app/shared/model/vehicle-models.model';

@Injectable({ providedIn: 'root' })
export class VehicleModelsResolve implements Resolve<IVehicleModels> {
  constructor(private service: VehicleModelsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicleModels> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<VehicleModels>) => response.ok),
        map((vehicleModels: HttpResponse<VehicleModels>) => vehicleModels.body)
      );
    }
    return of(new VehicleModels());
  }
}

export const vehicleModelsRoute: Routes = [
  {
    path: '',
    component: VehicleModelsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'VehicleModels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VehicleModelsDetailComponent,
    resolve: {
      vehicleModels: VehicleModelsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleModels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VehicleModelsUpdateComponent,
    resolve: {
      vehicleModels: VehicleModelsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleModels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VehicleModelsUpdateComponent,
    resolve: {
      vehicleModels: VehicleModelsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleModels'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const vehicleModelsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VehicleModelsDeletePopupComponent,
    resolve: {
      vehicleModels: VehicleModelsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleModels'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
