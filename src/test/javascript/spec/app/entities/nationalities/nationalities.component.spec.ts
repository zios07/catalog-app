/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CatalogappTestModule } from '../../../test.module';
import { NationalitiesComponent } from 'app/entities/nationalities/nationalities.component';
import { NationalitiesService } from 'app/entities/nationalities/nationalities.service';
import { Nationalities } from 'app/shared/model/nationalities.model';

describe('Component Tests', () => {
  describe('Nationalities Management Component', () => {
    let comp: NationalitiesComponent;
    let fixture: ComponentFixture<NationalitiesComponent>;
    let service: NationalitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [NationalitiesComponent],
        providers: []
      })
        .overrideTemplate(NationalitiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NationalitiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NationalitiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Nationalities(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.nationalities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
