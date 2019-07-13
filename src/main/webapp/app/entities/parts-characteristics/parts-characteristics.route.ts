import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartsCharacteristics } from 'app/shared/model/parts-characteristics.model';
import { PartsCharacteristicsService } from './parts-characteristics.service';
import { PartsCharacteristicsComponent } from './parts-characteristics.component';
import { PartsCharacteristicsDetailComponent } from './parts-characteristics-detail.component';
import { PartsCharacteristicsUpdateComponent } from './parts-characteristics-update.component';
import { PartsCharacteristicsDeletePopupComponent } from './parts-characteristics-delete-dialog.component';
import { IPartsCharacteristics } from 'app/shared/model/parts-characteristics.model';

@Injectable({ providedIn: 'root' })
export class PartsCharacteristicsResolve implements Resolve<IPartsCharacteristics> {
  constructor(private service: PartsCharacteristicsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPartsCharacteristics> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PartsCharacteristics>) => response.ok),
        map((partsCharacteristics: HttpResponse<PartsCharacteristics>) => partsCharacteristics.body)
      );
    }
    return of(new PartsCharacteristics());
  }
}

export const partsCharacteristicsRoute: Routes = [
  {
    path: '',
    component: PartsCharacteristicsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'PartsCharacteristics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartsCharacteristicsDetailComponent,
    resolve: {
      partsCharacteristics: PartsCharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsCharacteristics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartsCharacteristicsUpdateComponent,
    resolve: {
      partsCharacteristics: PartsCharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsCharacteristics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartsCharacteristicsUpdateComponent,
    resolve: {
      partsCharacteristics: PartsCharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsCharacteristics'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const partsCharacteristicsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PartsCharacteristicsDeletePopupComponent,
    resolve: {
      partsCharacteristics: PartsCharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsCharacteristics'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
