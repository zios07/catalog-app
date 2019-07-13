/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CatalogappTestModule } from '../../../test.module';
import { PartsCharacteristicsDeleteDialogComponent } from 'app/entities/parts-characteristics/parts-characteristics-delete-dialog.component';
import { PartsCharacteristicsService } from 'app/entities/parts-characteristics/parts-characteristics.service';

describe('Component Tests', () => {
  describe('PartsCharacteristics Management Delete Component', () => {
    let comp: PartsCharacteristicsDeleteDialogComponent;
    let fixture: ComponentFixture<PartsCharacteristicsDeleteDialogComponent>;
    let service: PartsCharacteristicsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogappTestModule],
        declarations: [PartsCharacteristicsDeleteDialogComponent]
      })
        .overrideTemplate(PartsCharacteristicsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartsCharacteristicsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartsCharacteristicsService);
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
