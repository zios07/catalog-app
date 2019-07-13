import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Families } from 'app/shared/model/families.model';
import { FamiliesService } from './families.service';
import { FamiliesComponent } from './families.component';
import { FamiliesDetailComponent } from './families-detail.component';
import { FamiliesUpdateComponent } from './families-update.component';
import { FamiliesDeletePopupComponent } from './families-delete-dialog.component';
import { IFamilies } from 'app/shared/model/families.model';

@Injectable({ providedIn: 'root' })
export class FamiliesResolve implements Resolve<IFamilies> {
  constructor(private service: FamiliesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFamilies> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Families>) => response.ok),
        map((families: HttpResponse<Families>) => families.body)
      );
    }
    return of(new Families());
  }
}

export const familiesRoute: Routes = [
  {
    path: '',
    component: FamiliesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Families'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FamiliesDetailComponent,
    resolve: {
      families: FamiliesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Families'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FamiliesUpdateComponent,
    resolve: {
      families: FamiliesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Families'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FamiliesUpdateComponent,
    resolve: {
      families: FamiliesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Families'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const familiesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FamiliesDeletePopupComponent,
    resolve: {
      families: FamiliesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Families'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
