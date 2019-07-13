import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  NationalitiesComponent,
  NationalitiesDetailComponent,
  NationalitiesUpdateComponent,
  NationalitiesDeletePopupComponent,
  NationalitiesDeleteDialogComponent,
  nationalitiesRoute,
  nationalitiesPopupRoute
} from './';

const ENTITY_STATES = [...nationalitiesRoute, ...nationalitiesPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NationalitiesComponent,
    NationalitiesDetailComponent,
    NationalitiesUpdateComponent,
    NationalitiesDeleteDialogComponent,
    NationalitiesDeletePopupComponent
  ],
  entryComponents: [
    NationalitiesComponent,
    NationalitiesUpdateComponent,
    NationalitiesDeleteDialogComponent,
    NationalitiesDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappNationalitiesModule {}
