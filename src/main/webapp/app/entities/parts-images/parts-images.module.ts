import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  PartsImagesComponent,
  PartsImagesDetailComponent,
  PartsImagesUpdateComponent,
  PartsImagesDeletePopupComponent,
  PartsImagesDeleteDialogComponent,
  partsImagesRoute,
  partsImagesPopupRoute
} from './';

const ENTITY_STATES = [...partsImagesRoute, ...partsImagesPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PartsImagesComponent,
    PartsImagesDetailComponent,
    PartsImagesUpdateComponent,
    PartsImagesDeleteDialogComponent,
    PartsImagesDeletePopupComponent
  ],
  entryComponents: [PartsImagesComponent, PartsImagesUpdateComponent, PartsImagesDeleteDialogComponent, PartsImagesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappPartsImagesModule {}
