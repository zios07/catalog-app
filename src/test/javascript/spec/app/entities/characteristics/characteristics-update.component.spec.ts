/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { CharacteristicsUpdateComponent } from 'app/entities/characteristics/characteristics-update.component';
import { CharacteristicsService } from 'app/entities/characteristics/characteristics.service';
import { Characteristics } from 'app/shared/model/characteristics.model';

describe('Component Tests', () => {
  describe('Characteristics Management Update Component', () => {
    let comp: CharacteristicsUpdateComponent;
    let fixture: ComponentFixture<CharacteristicsUpdateComponent>;
    let service: CharacteristicsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CharacteristicsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CharacteristicsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CharacteristicsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CharacteristicsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Characteristics(123);
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
        const entity = new Characteristics();
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
