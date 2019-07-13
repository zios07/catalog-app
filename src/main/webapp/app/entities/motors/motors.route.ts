import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Motors } from 'app/shared/model/motors.model';
import { MotorsService } from './motors.service';
import { MotorsComponent } from './motors.component';
import { MotorsDetailComponent } from './motors-detail.component';
import { MotorsUpdateComponent } from './motors-update.component';
import { MotorsDeletePopupComponent } from './motors-delete-dialog.component';
import { IMotors } from 'app/shared/model/motors.model';

@Injectable({ providedIn: 'root' })
export class MotorsResolve implements Resolve<IMotors> {
  constructor(private service: MotorsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMotors> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Motors>) => response.ok),
        map((motors: HttpResponse<Motors>) => motors.body)
      );
    }
    return of(new Motors());
  }
}

export const motorsRoute: Routes = [
  {
    path: '',
    component: MotorsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Motors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MotorsDetailComponent,
    resolve: {
      motors: MotorsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Motors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MotorsUpdateComponent,
    resolve: {
      motors: MotorsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Motors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MotorsUpdateComponent,
    resolve: {
      motors: MotorsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Motors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const motorsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MotorsDeletePopupComponent,
    resolve: {
      motors: MotorsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Motors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
