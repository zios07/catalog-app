/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { LinesUpdateComponent } from 'app/entities/lines/lines-update.component';
import { LinesService } from 'app/entities/lines/lines.service';
import { Lines } from 'app/shared/model/lines.model';

describe('Component Tests', () => {
  describe('Lines Management Update Component', () => {
    let comp: LinesUpdateComponent;
    let fixture: ComponentFixture<LinesUpdateComponent>;
    let service: LinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [LinesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LinesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LinesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LinesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Lines(123);
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
        const entity = new Lines();
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
