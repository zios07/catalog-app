/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { LinesDetailComponent } from 'app/entities/lines/lines-detail.component';
import { Lines } from 'app/shared/model/lines.model';

describe('Component Tests', () => {
  describe('Lines Management Detail Component', () => {
    let comp: LinesDetailComponent;
    let fixture: ComponentFixture<LinesDetailComponent>;
    const route = ({ data: of({ lines: new Lines(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [LinesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LinesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LinesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lines).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
