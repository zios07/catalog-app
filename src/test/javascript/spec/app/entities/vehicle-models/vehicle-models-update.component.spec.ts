/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { VehicleModelsUpdateComponent } from 'app/entities/vehicle-models/vehicle-models-update.component';
import { VehicleModelsService } from 'app/entities/vehicle-models/vehicle-models.service';
import { VehicleModels } from 'app/shared/model/vehicle-models.model';

describe('Component Tests', () => {
  describe('VehicleModels Management Update Component', () => {
    let comp: VehicleModelsUpdateComponent;
    let fixture: ComponentFixture<VehicleModelsUpdateComponent>;
    let service: VehicleModelsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [VehicleModelsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VehicleModelsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VehicleModelsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VehicleModelsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VehicleModels(123);
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
        const entity = new VehicleModels();
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
