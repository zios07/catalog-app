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
import { MDBRootModule } from 'angular-bootstrap-md';

const ENTITY_STATES = [...catalogsRoute, ...catalogsPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES), MDBRootModule],
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
