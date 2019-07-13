import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartsImages } from 'app/shared/model/parts-images.model';
import { PartsImagesService } from './parts-images.service';
import { PartsImagesComponent } from './parts-images.component';
import { PartsImagesDetailComponent } from './parts-images-detail.component';
import { PartsImagesUpdateComponent } from './parts-images-update.component';
import { PartsImagesDeletePopupComponent } from './parts-images-delete-dialog.component';
import { IPartsImages } from 'app/shared/model/parts-images.model';

@Injectable({ providedIn: 'root' })
export class PartsImagesResolve implements Resolve<IPartsImages> {
  constructor(private service: PartsImagesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPartsImages> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PartsImages>) => response.ok),
        map((partsImages: HttpResponse<PartsImages>) => partsImages.body)
      );
    }
    return of(new PartsImages());
  }
}

export const partsImagesRoute: Routes = [
  {
    path: '',
    component: PartsImagesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsImages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartsImagesDetailComponent,
    resolve: {
      partsImages: PartsImagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsImages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartsImagesUpdateComponent,
    resolve: {
      partsImages: PartsImagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsImages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartsImagesUpdateComponent,
    resolve: {
      partsImages: PartsImagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsImages'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const partsImagesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PartsImagesDeletePopupComponent,
    resolve: {
      partsImages: PartsImagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PartsImages'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
