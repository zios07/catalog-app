import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartsImages } from 'app/shared/model/parts-images.model';
import { PartsImagesService } from './parts-images.service';

@Component({
  selector: 'jhi-parts-images-delete-dialog',
  templateUrl: './parts-images-delete-dialog.component.html'
})
export class PartsImagesDeleteDialogComponent {
  partsImages: IPartsImages;

  constructor(
    protected partsImagesService: PartsImagesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partsImagesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'partsImagesListModification',
        content: 'Deleted an partsImages'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-parts-images-delete-popup',
  template: ''
})
export class PartsImagesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partsImages }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PartsImagesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.partsImages = partsImages;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/parts-images', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/parts-images', { outlets: { popup: null } }]);
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
