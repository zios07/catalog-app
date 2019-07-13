/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { VehicleModelsDetailComponent } from 'app/entities/vehicle-models/vehicle-models-detail.component';
import { VehicleModels } from 'app/shared/model/vehicle-models.model';

describe('Component Tests', () => {
  describe('VehicleModels Management Detail Component', () => {
    let comp: VehicleModelsDetailComponent;
    let fixture: ComponentFixture<VehicleModelsDetailComponent>;
    const route = ({ data: of({ vehicleModels: new VehicleModels(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [VehicleModelsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VehicleModelsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VehicleModelsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vehicleModels).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
