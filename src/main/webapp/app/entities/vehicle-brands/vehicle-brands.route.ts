import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleBrands } from 'app/shared/model/vehicle-brands.model';
import { VehicleBrandsService } from './vehicle-brands.service';
import { VehicleBrandsComponent } from './vehicle-brands.component';
import { VehicleBrandsDetailComponent } from './vehicle-brands-detail.component';
import { VehicleBrandsUpdateComponent } from './vehicle-brands-update.component';
import { VehicleBrandsDeletePopupComponent } from './vehicle-brands-delete-dialog.component';
import { IVehicleBrands } from 'app/shared/model/vehicle-brands.model';

@Injectable({ providedIn: 'root' })
export class VehicleBrandsResolve implements Resolve<IVehicleBrands> {
  constructor(private service: VehicleBrandsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicleBrands> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<VehicleBrands>) => response.ok),
        map((vehicleBrands: HttpResponse<VehicleBrands>) => vehicleBrands.body)
      );
    }
    return of(new VehicleBrands());
  }
}

export const vehicleBrandsRoute: Routes = [
  {
    path: '',
    component: VehicleBrandsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'VehicleBrands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VehicleBrandsDetailComponent,
    resolve: {
      vehicleBrands: VehicleBrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleBrands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VehicleBrandsUpdateComponent,
    resolve: {
      vehicleBrands: VehicleBrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleBrands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VehicleBrandsUpdateComponent,
    resolve: {
      vehicleBrands: VehicleBrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleBrands'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const vehicleBrandsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VehicleBrandsDeletePopupComponent,
    resolve: {
      vehicleBrands: VehicleBrandsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'VehicleBrands'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
