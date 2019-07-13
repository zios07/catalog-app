import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILines } from 'app/shared/model/lines.model';
import { LinesService } from './lines.service';

@Component({
  selector: 'jhi-lines-delete-dialog',
  templateUrl: './lines-delete-dialog.component.html'
})
export class LinesDeleteDialogComponent {
  lines: ILines;

  constructor(protected linesService: LinesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.linesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'linesListModification',
        content: 'Deleted an lines'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-lines-delete-popup',
  template: ''
})
export class LinesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ lines }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LinesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.lines = lines;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/lines', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/lines', { outlets: { popup: null } }]);
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
