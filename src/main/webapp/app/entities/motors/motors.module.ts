import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  MotorsComponent,
  MotorsDetailComponent,
  MotorsUpdateComponent,
  MotorsDeletePopupComponent,
  MotorsDeleteDialogComponent,
  motorsRoute,
  motorsPopupRoute
} from './';

const ENTITY_STATES = [...motorsRoute, ...motorsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MotorsComponent, MotorsDetailComponent, MotorsUpdateComponent, MotorsDeleteDialogComponent, MotorsDeletePopupComponent],
  entryComponents: [MotorsComponent, MotorsUpdateComponent, MotorsDeleteDialogComponent, MotorsDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappMotorsModule {}
