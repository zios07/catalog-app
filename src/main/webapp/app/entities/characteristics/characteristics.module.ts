import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  CharacteristicsComponent,
  CharacteristicsDetailComponent,
  CharacteristicsUpdateComponent,
  CharacteristicsDeletePopupComponent,
  CharacteristicsDeleteDialogComponent,
  characteristicsRoute,
  characteristicsPopupRoute
} from './';

const ENTITY_STATES = [...characteristicsRoute, ...characteristicsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CharacteristicsComponent,
    CharacteristicsDetailComponent,
    CharacteristicsUpdateComponent,
    CharacteristicsDeleteDialogComponent,
    CharacteristicsDeletePopupComponent
  ],
  entryComponents: [
    CharacteristicsComponent,
    CharacteristicsUpdateComponent,
    CharacteristicsDeleteDialogComponent,
    CharacteristicsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappCharacteristicsModule {}
