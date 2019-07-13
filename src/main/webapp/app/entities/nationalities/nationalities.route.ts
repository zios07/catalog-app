import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Nationalities } from 'app/shared/model/nationalities.model';
import { NationalitiesService } from './nationalities.service';
import { NationalitiesComponent } from './nationalities.component';
import { NationalitiesDetailComponent } from './nationalities-detail.component';
import { NationalitiesUpdateComponent } from './nationalities-update.component';
import { NationalitiesDeletePopupComponent } from './nationalities-delete-dialog.component';
import { INationalities } from 'app/shared/model/nationalities.model';

@Injectable({ providedIn: 'root' })
export class NationalitiesResolve implements Resolve<INationalities> {
  constructor(private service: NationalitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INationalities> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Nationalities>) => response.ok),
        map((nationalities: HttpResponse<Nationalities>) => nationalities.body)
      );
    }
    return of(new Nationalities());
  }
}

export const nationalitiesRoute: Routes = [
  {
    path: '',
    component: NationalitiesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nationalities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NationalitiesDetailComponent,
    resolve: {
      nationalities: NationalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nationalities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NationalitiesUpdateComponent,
    resolve: {
      nationalities: NationalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nationalities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NationalitiesUpdateComponent,
    resolve: {
      nationalities: NationalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nationalities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nationalitiesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NationalitiesDeletePopupComponent,
    resolve: {
      nationalities: NationalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nationalities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
