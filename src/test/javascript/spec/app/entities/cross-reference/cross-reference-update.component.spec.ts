/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { CrossReferenceUpdateComponent } from 'app/entities/cross-reference/cross-reference-update.component';
import { CrossReferenceService } from 'app/entities/cross-reference/cross-reference.service';
import { CrossReference } from 'app/shared/model/cross-reference.model';

describe('Component Tests', () => {
  describe('CrossReference Management Update Component', () => {
    let comp: CrossReferenceUpdateComponent;
    let fixture: ComponentFixture<CrossReferenceUpdateComponent>;
    let service: CrossReferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CrossReferenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CrossReferenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrossReferenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrossReferenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CrossReference(123);
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
        const entity = new CrossReference();
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
