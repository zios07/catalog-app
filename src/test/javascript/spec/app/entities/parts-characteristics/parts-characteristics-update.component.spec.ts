/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { PartsCharacteristicsUpdateComponent } from 'app/entities/parts-characteristics/parts-characteristics-update.component';
import { PartsCharacteristicsService } from 'app/entities/parts-characteristics/parts-characteristics.service';
import { PartsCharacteristics } from 'app/shared/model/parts-characteristics.model';

describe('Component Tests', () => {
  describe('PartsCharacteristics Management Update Component', () => {
    let comp: PartsCharacteristicsUpdateComponent;
    let fixture: ComponentFixture<PartsCharacteristicsUpdateComponent>;
    let service: PartsCharacteristicsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsCharacteristicsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartsCharacteristicsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartsCharacteristicsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsCharacteristicsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartsCharacteristics(123);
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
        const entity = new PartsCharacteristics();
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
