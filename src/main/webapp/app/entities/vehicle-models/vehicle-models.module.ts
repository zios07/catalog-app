import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  VehicleModelsComponent,
  VehicleModelsDetailComponent,
  VehicleModelsUpdateComponent,
  VehicleModelsDeletePopupComponent,
  VehicleModelsDeleteDialogComponent,
  vehicleModelsRoute,
  vehicleModelsPopupRoute
} from './';

const ENTITY_STATES = [...vehicleModelsRoute, ...vehicleModelsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VehicleModelsComponent,
    VehicleModelsDetailComponent,
    VehicleModelsUpdateComponent,
    VehicleModelsDeleteDialogComponent,
    VehicleModelsDeletePopupComponent
  ],
  entryComponents: [
    VehicleModelsComponent,
    VehicleModelsUpdateComponent,
    VehicleModelsDeleteDialogComponent,
    VehicleModelsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappVehicleModelsModule {}
