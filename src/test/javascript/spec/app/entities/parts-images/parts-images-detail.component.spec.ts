/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { PartsImagesDetailComponent } from 'app/entities/parts-images/parts-images-detail.component';
import { PartsImages } from 'app/shared/model/parts-images.model';

describe('Component Tests', () => {
  describe('PartsImages Management Detail Component', () => {
    let comp: PartsImagesDetailComponent;
    let fixture: ComponentFixture<PartsImagesDetailComponent>;
    const route = ({ data: of({ partsImages: new PartsImages(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsImagesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PartsImagesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartsImagesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partsImages).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
