/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CatalogappTestModule } from '../../../test.module';
import { NationalitiesDeleteDialogComponent } from 'app/entities/nationalities/nationalities-delete-dialog.component';
import { NationalitiesService } from 'app/entities/nationalities/nationalities.service';

describe('Component Tests', () => {
  describe('Nationalities Management Delete Component', () => {
    let comp: NationalitiesDeleteDialogComponent;
    let fixture: ComponentFixture<NationalitiesDeleteDialogComponent>;
    let service: NationalitiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [NationalitiesDeleteDialogComponent]
      })
        .overrideTemplate(NationalitiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NationalitiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NationalitiesService);
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
