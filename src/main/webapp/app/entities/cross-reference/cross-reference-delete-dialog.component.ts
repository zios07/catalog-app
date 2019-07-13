import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICrossReference } from 'app/shared/model/cross-reference.model';
import { CrossReferenceService } from './cross-reference.service';

@Component({
  selector: 'jhi-cross-reference-delete-dialog',
  templateUrl: './cross-reference-delete-dialog.component.html'
})
export class CrossReferenceDeleteDialogComponent {
  crossReference: ICrossReference;

  constructor(
    protected crossReferenceService: CrossReferenceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.crossReferenceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'crossReferenceListModification',
        content: 'Deleted an crossReference'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cross-reference-delete-popup',
  template: ''
})
export class CrossReferenceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ crossReference }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CrossReferenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.crossReference = crossReference;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cross-reference', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cross-reference', { outlets: { popup: null } }]);
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
