import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  FamiliesComponent,
  FamiliesDetailComponent,
  FamiliesUpdateComponent,
  FamiliesDeletePopupComponent,
  FamiliesDeleteDialogComponent,
  familiesRoute,
  familiesPopupRoute
} from './';

const ENTITY_STATES = [...familiesRoute, ...familiesPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FamiliesComponent,
    FamiliesDetailComponent,
    FamiliesUpdateComponent,
    FamiliesDeleteDialogComponent,
    FamiliesDeletePopupComponent
  ],
  entryComponents: [FamiliesComponent, FamiliesUpdateComponent, FamiliesDeleteDialogComponent, FamiliesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappFamiliesModule {}
