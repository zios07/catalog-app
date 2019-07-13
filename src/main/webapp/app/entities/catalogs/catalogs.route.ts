import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Catalogs } from 'app/shared/model/catalogs.model';
import { CatalogsService } from './catalogs.service';
import { CatalogsComponent } from './catalogs.component';
import { CatalogsDetailComponent } from './catalogs-detail.component';
import { CatalogsUpdateComponent } from './catalogs-update.component';
import { CatalogsDeletePopupComponent } from './catalogs-delete-dialog.component';
import { ICatalogs } from 'app/shared/model/catalogs.model';

@Injectable({ providedIn: 'root' })
export class CatalogsResolve implements Resolve<ICatalogs> {
  constructor(private service: CatalogsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICatalogs> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Catalogs>) => response.ok),
        map((catalogs: HttpResponse<Catalogs>) => catalogs.body)
      );
    }
    return of(new Catalogs());
  }
}

export const catalogsRoute: Routes = [
  {
    path: '',
    component: CatalogsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Catalogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CatalogsDetailComponent,
    resolve: {
      catalogs: CatalogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Catalogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CatalogsUpdateComponent,
    resolve: {
      catalogs: CatalogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Catalogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CatalogsUpdateComponent,
    resolve: {
      catalogs: CatalogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Catalogs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const catalogsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CatalogsDeletePopupComponent,
    resolve: {
      catalogs: CatalogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Catalogs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
