/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { PartsCharacteristicsDetailComponent } from 'app/entities/parts-characteristics/parts-characteristics-detail.component';
import { PartsCharacteristics } from 'app/shared/model/parts-characteristics.model';

describe('Component Tests', () => {
  describe('PartsCharacteristics Management Detail Component', () => {
    let comp: PartsCharacteristicsDetailComponent;
    let fixture: ComponentFixture<PartsCharacteristicsDetailComponent>;
    const route = ({ data: of({ partsCharacteristics: new PartsCharacteristics(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsCharacteristicsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PartsCharacteristicsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartsCharacteristicsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partsCharacteristics).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
