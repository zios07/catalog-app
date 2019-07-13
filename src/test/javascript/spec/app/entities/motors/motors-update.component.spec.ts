/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { MotorsUpdateComponent } from 'app/entities/motors/motors-update.component';
import { MotorsService } from 'app/entities/motors/motors.service';
import { Motors } from 'app/shared/model/motors.model';

describe('Component Tests', () => {
  describe('Motors Management Update Component', () => {
    let comp: MotorsUpdateComponent;
    let fixture: ComponentFixture<MotorsUpdateComponent>;
    let service: MotorsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [MotorsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MotorsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MotorsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MotorsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Motors(123);
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
        const entity = new Motors();
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
