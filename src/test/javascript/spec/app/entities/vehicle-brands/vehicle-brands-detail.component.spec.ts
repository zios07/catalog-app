/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { VehicleBrandsDetailComponent } from 'app/entities/vehicle-brands/vehicle-brands-detail.component';
import { VehicleBrands } from 'app/shared/model/vehicle-brands.model';

describe('Component Tests', () => {
  describe('VehicleBrands Management Detail Component', () => {
    let comp: VehicleBrandsDetailComponent;
    let fixture: ComponentFixture<VehicleBrandsDetailComponent>;
    const route = ({ data: of({ vehicleBrands: new VehicleBrands(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [VehicleBrandsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VehicleBrandsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VehicleBrandsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vehicleBrands).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
