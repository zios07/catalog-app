import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartsCharacteristics } from 'app/shared/model/parts-characteristics.model';
import { PartsCharacteristicsService } from './parts-characteristics.service';

@Component({
  selector: 'jhi-parts-characteristics-delete-dialog',
  templateUrl: './parts-characteristics-delete-dialog.component.html'
})
export class PartsCharacteristicsDeleteDialogComponent {
  partsCharacteristics: IPartsCharacteristics;

  constructor(
    protected partsCharacteristicsService: PartsCharacteristicsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partsCharacteristicsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'partsCharacteristicsListModification',
        content: 'Deleted an partsCharacteristics'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-parts-characteristics-delete-popup',
  template: ''
})
export class PartsCharacteristicsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partsCharacteristics }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PartsCharacteristicsDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.partsCharacteristics = partsCharacteristics;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/parts-characteristics', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/parts-characteristics', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
