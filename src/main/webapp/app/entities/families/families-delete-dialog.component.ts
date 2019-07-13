import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFamilies } from 'app/shared/model/families.model';
import { FamiliesService } from './families.service';

@Component({
  selector: 'jhi-families-delete-dialog',
  templateUrl: './families-delete-dialog.component.html'
})
export class FamiliesDeleteDialogComponent {
  families: IFamilies;

  constructor(protected familiesService: FamiliesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.familiesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'familiesListModification',
        content: 'Deleted an families'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-families-delete-popup',
  template: ''
})
export class FamiliesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ families }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FamiliesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.families = families;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/families', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/families', { outlets: { popup: null } }]);
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
