/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { CrossReferenceDetailComponent } from 'app/entities/cross-reference/cross-reference-detail.component';
import { CrossReference } from 'app/shared/model/cross-reference.model';

describe('Component Tests', () => {
  describe('CrossReference Management Detail Component', () => {
    let comp: CrossReferenceDetailComponent;
    let fixture: ComponentFixture<CrossReferenceDetailComponent>;
    const route = ({ data: of({ crossReference: new CrossReference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CrossReferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CrossReferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CrossReferenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.crossReference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
