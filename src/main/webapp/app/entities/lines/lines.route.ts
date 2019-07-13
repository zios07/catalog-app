import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Lines } from 'app/shared/model/lines.model';
import { LinesService } from './lines.service';
import { LinesComponent } from './lines.component';
import { LinesDetailComponent } from './lines-detail.component';
import { LinesUpdateComponent } from './lines-update.component';
import { LinesDeletePopupComponent } from './lines-delete-dialog.component';
import { ILines } from 'app/shared/model/lines.model';

@Injectable({ providedIn: 'root' })
export class LinesResolve implements Resolve<ILines> {
  constructor(private service: LinesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILines> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Lines>) => response.ok),
        map((lines: HttpResponse<Lines>) => lines.body)
      );
    }
    return of(new Lines());
  }
}

export const linesRoute: Routes = [
  {
    path: '',
    component: LinesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lines'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LinesDetailComponent,
    resolve: {
      lines: LinesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lines'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LinesUpdateComponent,
    resolve: {
      lines: LinesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lines'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LinesUpdateComponent,
    resolve: {
      lines: LinesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lines'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const linesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LinesDeletePopupComponent,
    resolve: {
      lines: LinesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lines'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
