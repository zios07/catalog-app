import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogappSharedModule } from 'app/shared';
import {
  ProvidersComponent,
  ProvidersDetailComponent,
  ProvidersUpdateComponent,
  ProvidersDeletePopupComponent,
  ProvidersDeleteDialogComponent,
  providersRoute,
  providersPopupRoute
} from './';

const ENTITY_STATES = [...providersRoute, ...providersPopupRoute];

@NgModule({
  imports: [CatalogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProvidersComponent,
    ProvidersDetailComponent,
    ProvidersUpdateComponent,
    ProvidersDeleteDialogComponent,
    ProvidersDeletePopupComponent
  ],
  entryComponents: [ProvidersComponent, ProvidersUpdateComponent, ProvidersDeleteDialogComponent, ProvidersDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappProvidersModule {}
