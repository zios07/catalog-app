/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { NationalitiesUpdateComponent } from 'app/entities/nationalities/nationalities-update.component';
import { NationalitiesService } from 'app/entities/nationalities/nationalities.service';
import { Nationalities } from 'app/shared/model/nationalities.model';

describe('Component Tests', () => {
  describe('Nationalities Management Update Component', () => {
    let comp: NationalitiesUpdateComponent;
    let fixture: ComponentFixture<NationalitiesUpdateComponent>;
    let service: NationalitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [NationalitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NationalitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NationalitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NationalitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Nationalities(123);
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
        const entity = new Nationalities();
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
