import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  LinesComponent,
  LinesDetailComponent,
  LinesUpdateComponent,
  LinesDeletePopupComponent,
  LinesDeleteDialogComponent,
  linesRoute,
  linesPopupRoute
} from './';

const ENTITY_STATES = [...linesRoute, ...linesPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LinesComponent, LinesDetailComponent, LinesUpdateComponent, LinesDeleteDialogComponent, LinesDeletePopupComponent],
  entryComponents: [LinesComponent, LinesUpdateComponent, LinesDeleteDialogComponent, LinesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappLinesModule {}
