import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'catalogs',
        loadChildren: './catalogs/catalogs.module#CatalogappCatalogsModule'
      },
      {
        path: 'lines',
        loadChildren: './lines/lines.module#CatalogappLinesModule'
      },
      {
        path: 'families',
        loadChildren: './families/families.module#CatalogappFamiliesModule'
      },
      {
        path: 'characteristics',
        loadChildren: './characteristics/characteristics.module#CatalogappCharacteristicsModule'
      },
      {
        path: 'parts',
        loadChildren: './parts/parts.module#CatalogappPartsModule'
      },
      {
        path: 'parts-images',
        loadChildren: './parts-images/parts-images.module#CatalogappPartsImagesModule'
      },
      {
        path: 'parts-characteristics',
        loadChildren: './parts-characteristics/parts-characteristics.module#CatalogappPartsCharacteristicsModule'
      },
      {
        path: 'vehicle-brands',
        loadChildren: './vehicle-brands/vehicle-brands.module#CatalogappVehicleBrandsModule'
      },
      {
        path: 'vehicles',
        loadChildren: './vehicles/vehicles.module#CatalogappVehiclesModule'
      },
      {
        path: 'motors',
        loadChildren: './motors/motors.module#CatalogappMotorsModule'
      },
      {
        path: 'transmission',
        loadChildren: './transmission/transmission.module#CatalogappTransmissionModule'
      },
      {
        path: 'steering',
        loadChildren: './steering/steering.module#CatalogappSteeringModule'
      },
      {
        path: 'nationalities',
        loadChildren: './nationalities/nationalities.module#CatalogappNationalitiesModule'
      },
      {
        path: 'vehicle-models',
        loadChildren: './vehicle-models/vehicle-models.module#CatalogappVehicleModelsModule'
      },
      {
        path: 'providers',
        loadChildren: './providers/providers.module#CatalogappProvidersModule'
      },
      {
        path: 'cross-reference',
        loadChildren: './cross-reference/cross-reference.module#CatalogappCrossReferenceModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogappEntityModule {}
