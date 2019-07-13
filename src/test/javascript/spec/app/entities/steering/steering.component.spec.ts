/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CatalogappTestModule } from '../../../test.module';
import { SteeringComponent } from 'app/entities/steering/steering.component';
import { SteeringService } from 'app/entities/steering/steering.service';
import { Steering } from 'app/shared/model/steering.model';

describe('Component Tests', () => {
  describe('Steering Management Component', () => {
    let comp: SteeringComponent;
    let fixture: ComponentFixture<SteeringComponent>;
    let service: SteeringService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [SteeringComponent],
        providers: []
      })
        .overrideTemplate(SteeringComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SteeringComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SteeringService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Steering(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.steerings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
