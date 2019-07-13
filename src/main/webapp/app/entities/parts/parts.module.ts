import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  PartsComponent,
  PartsDetailComponent,
  PartsUpdateComponent,
  PartsDeletePopupComponent,
  PartsDeleteDialogComponent,
  partsRoute,
  partsPopupRoute
} from './';

const ENTITY_STATES = [...partsRoute, ...partsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PartsComponent, PartsDetailComponent, PartsUpdateComponent, PartsDeleteDialogComponent, PartsDeletePopupComponent],
  entryComponents: [PartsComponent, PartsUpdateComponent, PartsDeleteDialogComponent, PartsDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappPartsModule {}
