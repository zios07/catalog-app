/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CatalogappTestModule } from '../../../test.module';
import { PartsImagesDeleteDialogComponent } from 'app/entities/parts-images/parts-images-delete-dialog.component';
import { PartsImagesService } from 'app/entities/parts-images/parts-images.service';

describe('Component Tests', () => {
  describe('PartsImages Management Delete Component', () => {
    let comp: PartsImagesDeleteDialogComponent;
    let fixture: ComponentFixture<PartsImagesDeleteDialogComponent>;
    let service: PartsImagesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsImagesDeleteDialogComponent]
      })
        .overrideTemplate(PartsImagesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartsImagesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsImagesService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
