/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatalogappTestModule } from '../../../test.module';
import { TransmissionDetailComponent } from 'app/entities/transmission/transmission-detail.component';
import { Transmission } from 'app/shared/model/transmission.model';

describe('Component Tests', () => {
  describe('Transmission Management Detail Component', () => {
    let comp: TransmissionDetailComponent;
    let fixture: ComponentFixture<TransmissionDetailComponent>;
    const route = ({ data: of({ transmission: new Transmission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [TransmissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TransmissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransmissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transmission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
