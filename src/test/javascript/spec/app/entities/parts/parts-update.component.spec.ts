/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { PartsUpdateComponent } from 'app/entities/parts/parts-update.component';
import { PartsService } from 'app/entities/parts/parts.service';
import { Parts } from 'app/shared/model/parts.model';

describe('Component Tests', () => {
  describe('Parts Management Update Component', () => {
    let comp: PartsUpdateComponent;
    let fixture: ComponentFixture<PartsUpdateComponent>;
    let service: PartsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Parts(123);
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
        const entity = new Parts();
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
