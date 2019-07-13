/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CatalogappTestModule } from '../../../test.module';
import { PartsDeleteDialogComponent } from 'app/entities/parts/parts-delete-dialog.component';
import { PartsService } from 'app/entities/parts/parts.service';

describe('Component Tests', () => {
  describe('Parts Management Delete Component', () => {
    let comp: PartsDeleteDialogComponent;
    let fixture: ComponentFixture<PartsDeleteDialogComponent>;
    let service: PartsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsDeleteDialogComponent]
      })
        .overrideTemplate(PartsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsService);
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
