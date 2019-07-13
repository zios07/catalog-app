import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogappSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CatalogappSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CatalogappSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappSharedModule {
  static forRoot() {
    return {
      ngModule: CatalogappSharedModule
    };
  }
}
