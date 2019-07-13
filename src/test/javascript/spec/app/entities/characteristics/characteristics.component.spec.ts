/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CatalogappTestModule } from '../../../test.module';
import { CharacteristicsComponent } from 'app/entities/characteristics/characteristics.component';
import { CharacteristicsService } from 'app/entities/characteristics/characteristics.service';
import { Characteristics } from 'app/shared/model/characteristics.model';

describe('Component Tests', () => {
  describe('Characteristics Management Component', () => {
    let comp: CharacteristicsComponent;
    let fixture: ComponentFixture<CharacteristicsComponent>;
    let service: CharacteristicsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CharacteristicsComponent],
        providers: []
      })
        .overrideTemplate(CharacteristicsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CharacteristicsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CharacteristicsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Characteristics(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.characteristics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
