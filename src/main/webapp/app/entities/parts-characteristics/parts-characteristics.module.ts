import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  PartsCharacteristicsComponent,
  PartsCharacteristicsDetailComponent,
  PartsCharacteristicsUpdateComponent,
  PartsCharacteristicsDeletePopupComponent,
  PartsCharacteristicsDeleteDialogComponent,
  partsCharacteristicsRoute,
  partsCharacteristicsPopupRoute
} from './';

const ENTITY_STATES = [...partsCharacteristicsRoute, ...partsCharacteristicsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PartsCharacteristicsComponent,
    PartsCharacteristicsDetailComponent,
    PartsCharacteristicsUpdateComponent,
    PartsCharacteristicsDeleteDialogComponent,
    PartsCharacteristicsDeletePopupComponent
  ],
  entryComponents: [
    PartsCharacteristicsComponent,
    PartsCharacteristicsUpdateComponent,
    PartsCharacteristicsDeleteDialogComponent,
    PartsCharacteristicsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappPartsCharacteristicsModule {}
