/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CatalogappTestModule } from '../../../test.module';
import { CrossReferenceDeleteDialogComponent } from 'app/entities/cross-reference/cross-reference-delete-dialog.component';
import { CrossReferenceService } from 'app/entities/cross-reference/cross-reference.service';

describe('Component Tests', () => {
  describe('CrossReference Management Delete Component', () => {
    let comp: CrossReferenceDeleteDialogComponent;
    let fixture: ComponentFixture<CrossReferenceDeleteDialogComponent>;
    let service: CrossReferenceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CrossReferenceDeleteDialogComponent]
      })
        .overrideTemplate(CrossReferenceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CrossReferenceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrossReferenceService);
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
