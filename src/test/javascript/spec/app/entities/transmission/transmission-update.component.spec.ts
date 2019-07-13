/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { TransmissionUpdateComponent } from 'app/entities/transmission/transmission-update.component';
import { TransmissionService } from 'app/entities/transmission/transmission.service';
import { Transmission } from 'app/shared/model/transmission.model';

describe('Component Tests', () => {
  describe('Transmission Management Update Component', () => {
    let comp: TransmissionUpdateComponent;
    let fixture: ComponentFixture<TransmissionUpdateComponent>;
    let service: TransmissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [TransmissionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransmissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransmissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransmissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transmission(123);
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
        const entity = new Transmission();
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
