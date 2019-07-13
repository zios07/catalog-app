import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Transmission } from 'app/shared/model/transmission.model';
import { TransmissionService } from './transmission.service';
import { TransmissionComponent } from './transmission.component';
import { TransmissionDetailComponent } from './transmission-detail.component';
import { TransmissionUpdateComponent } from './transmission-update.component';
import { TransmissionDeletePopupComponent } from './transmission-delete-dialog.component';
import { ITransmission } from 'app/shared/model/transmission.model';

@Injectable({ providedIn: 'root' })
export class TransmissionResolve implements Resolve<ITransmission> {
  constructor(private service: TransmissionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransmission> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Transmission>) => response.ok),
        map((transmission: HttpResponse<Transmission>) => transmission.body)
      );
    }
    return of(new Transmission());
  }
}

export const transmissionRoute: Routes = [
  {
    path: '',
    component: TransmissionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Transmissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransmissionDetailComponent,
    resolve: {
      transmission: TransmissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Transmissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransmissionUpdateComponent,
    resolve: {
      transmission: TransmissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Transmissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransmissionUpdateComponent,
    resolve: {
      transmission: TransmissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Transmissions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const transmissionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TransmissionDeletePopupComponent,
    resolve: {
      transmission: TransmissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Transmissions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
