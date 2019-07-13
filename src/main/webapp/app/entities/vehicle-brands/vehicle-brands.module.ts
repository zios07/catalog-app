import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  VehicleBrandsComponent,
  VehicleBrandsDetailComponent,
  VehicleBrandsUpdateComponent,
  VehicleBrandsDeletePopupComponent,
  VehicleBrandsDeleteDialogComponent,
  vehicleBrandsRoute,
  vehicleBrandsPopupRoute
} from './';

const ENTITY_STATES = [...vehicleBrandsRoute, ...vehicleBrandsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VehicleBrandsComponent,
    VehicleBrandsDetailComponent,
    VehicleBrandsUpdateComponent,
    VehicleBrandsDeleteDialogComponent,
    VehicleBrandsDeletePopupComponent
  ],
  entryComponents: [
    VehicleBrandsComponent,
    VehicleBrandsUpdateComponent,
    VehicleBrandsDeleteDialogComponent,
    VehicleBrandsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappVehicleBrandsModule {}
