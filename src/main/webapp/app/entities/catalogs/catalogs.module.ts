import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  CatalogsComponent,
  CatalogsDetailComponent,
  CatalogsUpdateComponent,
  CatalogsDeletePopupComponent,
  CatalogsDeleteDialogComponent,
  catalogsRoute,
  catalogsPopupRoute
} from './';

const ENTITY_STATES = [...catalogsRoute, ...catalogsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CatalogsComponent,
    CatalogsDetailComponent,
    CatalogsUpdateComponent,
    CatalogsDeleteDialogComponent,
    CatalogsDeletePopupComponent
  ],
  entryComponents: [CatalogsComponent, CatalogsUpdateComponent, CatalogsDeleteDialogComponent, CatalogsDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappCatalogsModule {}
