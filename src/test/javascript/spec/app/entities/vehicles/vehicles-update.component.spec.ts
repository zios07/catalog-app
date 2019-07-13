/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { VehiclesUpdateComponent } from 'app/entities/vehicles/vehicles-update.component';
import { VehiclesService } from 'app/entities/vehicles/vehicles.service';
import { Vehicles } from 'app/shared/model/vehicles.model';

describe('Component Tests', () => {
  describe('Vehicles Management Update Component', () => {
    let comp: VehiclesUpdateComponent;
    let fixture: ComponentFixture<VehiclesUpdateComponent>;
    let service: VehiclesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [VehiclesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VehiclesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VehiclesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VehiclesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vehicles(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vehicles();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
