import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransmission } from 'app/shared/model/transmission.model';
import { TransmissionService } from './transmission.service';

@Component({
  selector: 'jhi-transmission-delete-dialog',
  templateUrl: './transmission-delete-dialog.component.html'
})
export class TransmissionDeleteDialogComponent {
  transmission: ITransmission;

  constructor(
    protected transmissionService: TransmissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transmissionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'transmissionListModification',
        content: 'Deleted an transmission'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-transmission-delete-popup',
  template: ''
})
export class TransmissionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transmission }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TransmissionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.transmission = transmission;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/transmission', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/transmission', { outlets: { popup: null } }]);
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
