/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CatalogappTestModule } from '../../../test.module';
import { PartsImagesComponent } from 'app/entities/parts-images/parts-images.component';
import { PartsImagesService } from 'app/entities/parts-images/parts-images.service';
import { PartsImages } from 'app/shared/model/parts-images.model';

describe('Component Tests', () => {
  describe('PartsImages Management Component', () => {
    let comp: PartsImagesComponent;
    let fixture: ComponentFixture<PartsImagesComponent>;
    let service: PartsImagesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsImagesComponent],
        providers: []
      })
        .overrideTemplate(PartsImagesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartsImagesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsImagesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PartsImages(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.partsImages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
