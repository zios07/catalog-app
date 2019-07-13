/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { FamiliesUpdateComponent } from 'app/entities/families/families-update.component';
import { FamiliesService } from 'app/entities/families/families.service';
import { Families } from 'app/shared/model/families.model';

describe('Component Tests', () => {
  describe('Families Management Update Component', () => {
    let comp: FamiliesUpdateComponent;
    let fixture: ComponentFixture<FamiliesUpdateComponent>;
    let service: FamiliesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [FamiliesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FamiliesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FamiliesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FamiliesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Families(123);
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
        const entity = new Families();
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
