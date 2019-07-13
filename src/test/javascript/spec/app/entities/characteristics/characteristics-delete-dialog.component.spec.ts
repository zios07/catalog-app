/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CatalogappTestModule } from '../../../test.module';
import { CharacteristicsDeleteDialogComponent } from 'app/entities/characteristics/characteristics-delete-dialog.component';
import { CharacteristicsService } from 'app/entities/characteristics/characteristics.service';

describe('Component Tests', () => {
  describe('Characteristics Management Delete Component', () => {
    let comp: CharacteristicsDeleteDialogComponent;
    let fixture: ComponentFixture<CharacteristicsDeleteDialogComponent>;
    let service: CharacteristicsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [CharacteristicsDeleteDialogComponent]
      })
        .overrideTemplate(CharacteristicsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CharacteristicsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CharacteristicsService);
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
