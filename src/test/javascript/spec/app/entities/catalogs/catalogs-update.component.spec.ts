/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { CatalogsUpdateComponent } from 'app/entities/catalogs/catalogs-update.component';
import { CatalogsService } from 'app/entities/catalogs/catalogs.service';
import { Catalogs } from 'app/shared/model/catalogs.model';

describe('Component Tests', () => {
  describe('Catalogs Management Update Component', () => {
    let comp: CatalogsUpdateComponent;
    let fixture: ComponentFixture<CatalogsUpdateComponent>;
    let service: CatalogsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CatalogsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CatalogsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CatalogsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CatalogsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Catalogs(123);
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
        const entity = new Catalogs();
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
