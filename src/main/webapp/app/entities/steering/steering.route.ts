import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Steering } from 'app/shared/model/steering.model';
import { SteeringService } from './steering.service';
import { SteeringComponent } from './steering.component';
import { SteeringDetailComponent } from './steering-detail.component';
import { SteeringUpdateComponent } from './steering-update.component';
import { SteeringDeletePopupComponent } from './steering-delete-dialog.component';
import { ISteering } from 'app/shared/model/steering.model';

@Injectable({ providedIn: 'root' })
export class SteeringResolve implements Resolve<ISteering> {
  constructor(private service: SteeringService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISteering> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Steering>) => response.ok),
        map((steering: HttpResponse<Steering>) => steering.body)
      );
    }
    return of(new Steering());
  }
}

export const steeringRoute: Routes = [
  {
    path: '',
    component: SteeringComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Steerings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SteeringDetailComponent,
    resolve: {
      steering: SteeringResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Steerings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SteeringUpdateComponent,
    resolve: {
      steering: SteeringResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Steerings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SteeringUpdateComponent,
    resolve: {
      steering: SteeringResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Steerings'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const steeringPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SteeringDeletePopupComponent,
    resolve: {
      steering: SteeringResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Steerings'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
