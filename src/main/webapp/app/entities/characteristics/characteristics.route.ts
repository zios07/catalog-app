import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Characteristics } from 'app/shared/model/characteristics.model';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsComponent } from './characteristics.component';
import { CharacteristicsDetailComponent } from './characteristics-detail.component';
import { CharacteristicsUpdateComponent } from './characteristics-update.component';
import { CharacteristicsDeletePopupComponent } from './characteristics-delete-dialog.component';
import { ICharacteristics } from 'app/shared/model/characteristics.model';

@Injectable({ providedIn: 'root' })
export class CharacteristicsResolve implements Resolve<ICharacteristics> {
  constructor(private service: CharacteristicsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICharacteristics> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Characteristics>) => response.ok),
        map((characteristics: HttpResponse<Characteristics>) => characteristics.body)
      );
    }
    return of(new Characteristics());
  }
}

export const characteristicsRoute: Routes = [
  {
    path: '',
    component: CharacteristicsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Characteristics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CharacteristicsDetailComponent,
    resolve: {
      characteristics: CharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Characteristics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CharacteristicsUpdateComponent,
    resolve: {
      characteristics: CharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Characteristics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CharacteristicsUpdateComponent,
    resolve: {
      characteristics: CharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Characteristics'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const characteristicsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CharacteristicsDeletePopupComponent,
    resolve: {
      characteristics: CharacteristicsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Characteristics'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
