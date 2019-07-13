import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CrossReference } from 'app/shared/model/cross-reference.model';
import { CrossReferenceService } from './cross-reference.service';
import { CrossReferenceComponent } from './cross-reference.component';
import { CrossReferenceDetailComponent } from './cross-reference-detail.component';
import { CrossReferenceUpdateComponent } from './cross-reference-update.component';
import { CrossReferenceDeletePopupComponent } from './cross-reference-delete-dialog.component';
import { ICrossReference } from 'app/shared/model/cross-reference.model';

@Injectable({ providedIn: 'root' })
export class CrossReferenceResolve implements Resolve<ICrossReference> {
  constructor(private service: CrossReferenceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICrossReference> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CrossReference>) => response.ok),
        map((crossReference: HttpResponse<CrossReference>) => crossReference.body)
      );
    }
    return of(new CrossReference());
  }
}

export const crossReferenceRoute: Routes = [
  {
    path: '',
    component: CrossReferenceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'CrossReferences'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CrossReferenceDetailComponent,
    resolve: {
      crossReference: CrossReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrossReferences'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CrossReferenceUpdateComponent,
    resolve: {
      crossReference: CrossReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrossReferences'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CrossReferenceUpdateComponent,
    resolve: {
      crossReference: CrossReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrossReferences'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const crossReferencePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CrossReferenceDeletePopupComponent,
    resolve: {
      crossReference: CrossReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CrossReferences'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
