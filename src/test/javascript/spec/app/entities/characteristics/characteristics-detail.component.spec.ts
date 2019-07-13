/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { CharacteristicsDetailComponent } from 'app/entities/characteristics/characteristics-detail.component';
import { Characteristics } from 'app/shared/model/characteristics.model';

describe('Component Tests', () => {
  describe('Characteristics Management Detail Component', () => {
    let comp: CharacteristicsDetailComponent;
    let fixture: ComponentFixture<CharacteristicsDetailComponent>;
    const route = ({ data: of({ characteristics: new Characteristics(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CharacteristicsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CharacteristicsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CharacteristicsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.characteristics).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
