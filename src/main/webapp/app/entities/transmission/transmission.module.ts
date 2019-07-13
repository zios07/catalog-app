import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  TransmissionComponent,
  TransmissionDetailComponent,
  TransmissionUpdateComponent,
  TransmissionDeletePopupComponent,
  TransmissionDeleteDialogComponent,
  transmissionRoute,
  transmissionPopupRoute
} from './';

const ENTITY_STATES = [...transmissionRoute, ...transmissionPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TransmissionComponent,
    TransmissionDetailComponent,
    TransmissionUpdateComponent,
    TransmissionDeleteDialogComponent,
    TransmissionDeletePopupComponent
  ],
  entryComponents: [
    TransmissionComponent,
    TransmissionUpdateComponent,
    TransmissionDeleteDialogComponent,
    TransmissionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappTransmissionModule {}
