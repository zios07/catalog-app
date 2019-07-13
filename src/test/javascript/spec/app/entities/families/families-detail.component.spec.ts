/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { FamiliesDetailComponent } from 'app/entities/families/families-detail.component';
import { Families } from 'app/shared/model/families.model';

describe('Component Tests', () => {
  describe('Families Management Detail Component', () => {
    let comp: FamiliesDetailComponent;
    let fixture: ComponentFixture<FamiliesDetailComponent>;
    const route = ({ data: of({ families: new Families(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [FamiliesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FamiliesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FamiliesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.families).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
