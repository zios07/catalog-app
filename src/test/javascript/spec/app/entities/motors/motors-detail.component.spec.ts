/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { MotorsDetailComponent } from 'app/entities/motors/motors-detail.component';
import { Motors } from 'app/shared/model/motors.model';

describe('Component Tests', () => {
  describe('Motors Management Detail Component', () => {
    let comp: MotorsDetailComponent;
    let fixture: ComponentFixture<MotorsDetailComponent>;
    const route = ({ data: of({ motors: new Motors(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [MotorsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MotorsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MotorsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.motors).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
