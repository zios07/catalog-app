/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { VehiclesDetailComponent } from 'app/entities/vehicles/vehicles-detail.component';
import { Vehicles } from 'app/shared/model/vehicles.model';

describe('Component Tests', () => {
  describe('Vehicles Management Detail Component', () => {
    let comp: VehiclesDetailComponent;
    let fixture: ComponentFixture<VehiclesDetailComponent>;
    const route = ({ data: of({ vehicles: new Vehicles(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [VehiclesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VehiclesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VehiclesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vehicles).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
