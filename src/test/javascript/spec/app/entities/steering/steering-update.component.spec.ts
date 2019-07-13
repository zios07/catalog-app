/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { SteeringUpdateComponent } from 'app/entities/steering/steering-update.component';
import { SteeringService } from 'app/entities/steering/steering.service';
import { Steering } from 'app/shared/model/steering.model';

describe('Component Tests', () => {
  describe('Steering Management Update Component', () => {
    let comp: SteeringUpdateComponent;
    let fixture: ComponentFixture<SteeringUpdateComponent>;
    let service: SteeringService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [SteeringUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SteeringUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SteeringUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SteeringService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Steering(123);
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
        const entity = new Steering();
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
