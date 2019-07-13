import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  VehiclesComponent,
  VehiclesDetailComponent,
  VehiclesUpdateComponent,
  VehiclesDeletePopupComponent,
  VehiclesDeleteDialogComponent,
  vehiclesRoute,
  vehiclesPopupRoute
} from './';

const ENTITY_STATES = [...vehiclesRoute, ...vehiclesPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VehiclesComponent,
    VehiclesDetailComponent,
    VehiclesUpdateComponent,
    VehiclesDeleteDialogComponent,
    VehiclesDeletePopupComponent
  ],
  entryComponents: [VehiclesComponent, VehiclesUpdateComponent, VehiclesDeleteDialogComponent, VehiclesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappVehiclesModule {}
