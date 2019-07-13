import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  SteeringComponent,
  SteeringDetailComponent,
  SteeringUpdateComponent,
  SteeringDeletePopupComponent,
  SteeringDeleteDialogComponent,
  steeringRoute,
  steeringPopupRoute
} from './';

const ENTITY_STATES = [...steeringRoute, ...steeringPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SteeringComponent,
    SteeringDetailComponent,
    SteeringUpdateComponent,
    SteeringDeleteDialogComponent,
    SteeringDeletePopupComponent
  ],
  entryComponents: [SteeringComponent, SteeringUpdateComponent, SteeringDeleteDialogComponent, SteeringDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappSteeringModule {}
