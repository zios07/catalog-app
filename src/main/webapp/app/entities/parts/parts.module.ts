import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

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
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

const ENTITY_STATES = [...partsRoute, ...partsPopupRoute];

@NgModule({
  imports: [
    CatalogappSharedModule,
    RouterModule.forChild(ENTITY_STATES),
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [PartsComponent, PartsDetailComponent, PartsUpdateComponent, PartsDeleteDialogComponent, PartsDeletePopupComponent],
  entryComponents: [PartsComponent, PartsUpdateComponent, PartsDeleteDialogComponent, PartsDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappPartsModule {}
