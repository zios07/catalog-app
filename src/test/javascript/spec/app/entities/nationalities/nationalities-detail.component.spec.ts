/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { NationalitiesDetailComponent } from 'app/entities/nationalities/nationalities-detail.component';
import { Nationalities } from 'app/shared/model/nationalities.model';

describe('Component Tests', () => {
  describe('Nationalities Management Detail Component', () => {
    let comp: NationalitiesDetailComponent;
    let fixture: ComponentFixture<NationalitiesDetailComponent>;
    const route = ({ data: of({ nationalities: new Nationalities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [NationalitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NationalitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NationalitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nationalities).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
