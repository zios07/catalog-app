import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParts } from 'app/shared/model/parts.model';
import { PartsService } from './parts.service';

@Component({
  selector: 'jhi-parts-delete-dialog',
  templateUrl: './parts-delete-dialog.component.html'
})
export class PartsDeleteDialogComponent {
  parts: IParts;

  constructor(protected partsService: PartsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'partsListModification',
        content: 'Deleted an parts'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-parts-delete-popup',
  template: ''
})
export class PartsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parts }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PartsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.parts = parts;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/parts', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/parts', { outlets: { popup: null } }]);
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
