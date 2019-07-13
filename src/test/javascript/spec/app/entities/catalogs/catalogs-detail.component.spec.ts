/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { CatalogsDetailComponent } from 'app/entities/catalogs/catalogs-detail.component';
import { Catalogs } from 'app/shared/model/catalogs.model';

describe('Component Tests', () => {
  describe('Catalogs Management Detail Component', () => {
    let comp: CatalogsDetailComponent;
    let fixture: ComponentFixture<CatalogsDetailComponent>;
    const route = ({ data: of({ catalogs: new Catalogs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CatalogsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CatalogsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CatalogsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.catalogs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
