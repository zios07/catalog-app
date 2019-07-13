import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISteering } from 'app/shared/model/steering.model';
import { SteeringService } from './steering.service';

@Component({
  selector: 'jhi-steering-delete-dialog',
  templateUrl: './steering-delete-dialog.component.html'
})
export class SteeringDeleteDialogComponent {
  steering: ISteering;

  constructor(protected steeringService: SteeringService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.steeringService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'steeringListModification',
        content: 'Deleted an steering'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-steering-delete-popup',
  template: ''
})
export class SteeringDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ steering }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SteeringDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.steering = steering;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/steering', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/steering', { outlets: { popup: null } }]);
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
