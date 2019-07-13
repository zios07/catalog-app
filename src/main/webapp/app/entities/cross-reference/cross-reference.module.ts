import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  CrossReferenceComponent,
  CrossReferenceDetailComponent,
  CrossReferenceUpdateComponent,
  CrossReferenceDeletePopupComponent,
  CrossReferenceDeleteDialogComponent,
  crossReferenceRoute,
  crossReferencePopupRoute
} from './';

const ENTITY_STATES = [...crossReferenceRoute, ...crossReferencePopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CrossReferenceComponent,
    CrossReferenceDetailComponent,
    CrossReferenceUpdateComponent,
    CrossReferenceDeleteDialogComponent,
    CrossReferenceDeletePopupComponent
  ],
  entryComponents: [
    CrossReferenceComponent,
    CrossReferenceUpdateComponent,
    CrossReferenceDeleteDialogComponent,
    CrossReferenceDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappCrossReferenceModule {}
