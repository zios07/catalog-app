import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICatalogs } from 'app/shared/model/catalogs.model';
import { CatalogsService } from './catalogs.service';

@Component({
  selector: 'jhi-catalogs-delete-dialog',
  templateUrl: './catalogs-delete-dialog.component.html'
})
export class CatalogsDeleteDialogComponent {
  catalogs: ICatalogs;

  constructor(protected catalogsService: CatalogsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.catalogsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'catalogsListModification',
        content: 'Deleted an catalogs'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-catalogs-delete-popup',
  template: ''
})
export class CatalogsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ catalogs }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CatalogsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.catalogs = catalogs;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/catalogs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/catalogs', { outlets: { popup: null } }]);
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
