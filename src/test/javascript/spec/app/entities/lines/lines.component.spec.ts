/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CatalogappTestModule } from '../../../test.module';
import { LinesComponent } from 'app/entities/lines/lines.component';
import { LinesService } from 'app/entities/lines/lines.service';
import { Lines } from 'app/shared/model/lines.model';

describe('Component Tests', () => {
  describe('Lines Management Component', () => {
    let comp: LinesComponent;
    let fixture: ComponentFixture<LinesComponent>;
    let service: LinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [LinesComponent],
        providers: []
      })
        .overrideTemplate(LinesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LinesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LinesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Lines(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
