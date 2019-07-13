import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parts } from 'app/shared/model/parts.model';
import { PartsService } from './parts.service';
import { PartsComponent } from './parts.component';
import { PartsDetailComponent } from './parts-detail.component';
import { PartsUpdateComponent } from './parts-update.component';
import { PartsDeletePopupComponent } from './parts-delete-dialog.component';
import { IParts } from 'app/shared/model/parts.model';

@Injectable({ providedIn: 'root' })
export class PartsResolve implements Resolve<IParts> {
  constructor(private service: PartsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParts> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Parts>) => response.ok),
        map((parts: HttpResponse<Parts>) => parts.body)
      );
    }
    return of(new Parts());
  }
}

export const partsRoute: Routes = [
  {
    path: '',
    component: PartsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Parts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartsDetailComponent,
    resolve: {
      parts: PartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartsUpdateComponent,
    resolve: {
      parts: PartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartsUpdateComponent,
    resolve: {
      parts: PartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const partsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PartsDeletePopupComponent,
    resolve: {
      parts: PartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Parts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
