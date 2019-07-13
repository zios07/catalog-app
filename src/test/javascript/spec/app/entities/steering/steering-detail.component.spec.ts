/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { SteeringDetailComponent } from 'app/entities/steering/steering-detail.component';
import { Steering } from 'app/shared/model/steering.model';

describe('Component Tests', () => {
  describe('Steering Management Detail Component', () => {
    let comp: SteeringDetailComponent;
    let fixture: ComponentFixture<SteeringDetailComponent>;
    const route = ({ data: of({ steering: new Steering(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [SteeringDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SteeringDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SteeringDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.steering).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
