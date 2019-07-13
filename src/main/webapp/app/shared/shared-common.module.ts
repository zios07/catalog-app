import { NgModule } from '@angular/core';

import { CatalogappSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [CatalogappSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [CatalogappSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CatalogappSharedCommonModule {}
