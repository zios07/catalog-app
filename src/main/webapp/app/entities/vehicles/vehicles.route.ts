import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vehicles } from 'app/shared/model/vehicles.model';
import { VehiclesService } from './vehicles.service';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesDetailComponent } from './vehicles-detail.component';
import { VehiclesUpdateComponent } from './vehicles-update.component';
import { VehiclesDeletePopupComponent } from './vehicles-delete-dialog.component';
import { IVehicles } from 'app/shared/model/vehicles.model';

@Injectable({ providedIn: 'root' })
export class VehiclesResolve implements Resolve<IVehicles> {
  constructor(private service: VehiclesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicles> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Vehicles>) => response.ok),
        map((vehicles: HttpResponse<Vehicles>) => vehicles.body)
      );
    }
    return of(new Vehicles());
  }
}

export const vehiclesRoute: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Vehicles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VehiclesDetailComponent,
    resolve: {
      vehicles: VehiclesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vehicles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VehiclesUpdateComponent,
    resolve: {
      vehicles: VehiclesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vehicles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VehiclesUpdateComponent,
    resolve: {
      vehicles: VehiclesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vehicles'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const vehiclesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VehiclesDeletePopupComponent,
    resolve: {
      vehicles: VehiclesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Vehicles'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
