import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMotors } from 'app/shared/model/motors.model';
import { MotorsService } from './motors.service';

@Component({
  selector: 'jhi-motors-delete-dialog',
  templateUrl: './motors-delete-dialog.component.html'
})
export class MotorsDeleteDialogComponent {
  motors: IMotors;

  constructor(protected motorsService: MotorsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.motorsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'motorsListModification',
        content: 'Deleted an motors'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-motors-delete-popup',
  template: ''
})
export class MotorsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ motors }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MotorsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.motors = motors;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/motors', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/motors', { outlets: { popup: null } }]);
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
