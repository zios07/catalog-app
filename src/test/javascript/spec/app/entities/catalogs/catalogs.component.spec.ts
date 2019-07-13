/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CatalogappTestModule } from '../../../test.module';
import { CatalogsComponent } from 'app/entities/catalogs/catalogs.component';
import { CatalogsService } from 'app/entities/catalogs/catalogs.service';
import { Catalogs } from 'app/shared/model/catalogs.model';

describe('Component Tests', () => {
  describe('Catalogs Management Component', () => {
    let comp: CatalogsComponent;
    let fixture: ComponentFixture<CatalogsComponent>;
    let service: CatalogsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CatalogsComponent],
        providers: []
      })
        .overrideTemplate(CatalogsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CatalogsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CatalogsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Catalogs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.catalogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
