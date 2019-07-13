import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INationalities } from 'app/shared/model/nationalities.model';
import { NationalitiesService } from './nationalities.service';

@Component({
  selector: 'jhi-nationalities-delete-dialog',
  templateUrl: './nationalities-delete-dialog.component.html'
})
export class NationalitiesDeleteDialogComponent {
  nationalities: INationalities;

  constructor(
    protected nationalitiesService: NationalitiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.nationalitiesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'nationalitiesListModification',
        content: 'Deleted an nationalities'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nationalities-delete-popup',
  template: ''
})
export class NationalitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nationalities }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NationalitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.nationalities = nationalities;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/nationalities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/nationalities', { outlets: { popup: null } }]);
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
