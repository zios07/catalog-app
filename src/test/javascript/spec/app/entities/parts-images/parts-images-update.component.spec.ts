/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { PartsImagesUpdateComponent } from 'app/entities/parts-images/parts-images-update.component';
import { PartsImagesService } from 'app/entities/parts-images/parts-images.service';
import { PartsImages } from 'app/shared/model/parts-images.model';

describe('Component Tests', () => {
  describe('PartsImages Management Update Component', () => {
    let comp: PartsImagesUpdateComponent;
    let fixture: ComponentFixture<PartsImagesUpdateComponent>;
    let service: PartsImagesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsImagesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartsImagesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartsImagesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsImagesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartsImages(123);
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
        const entity = new PartsImages();
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
