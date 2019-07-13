import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleBrands } from 'app/shared/model/vehicle-brands.model';
import { VehicleBrandsService } from './vehicle-brands.service';

@Component({
  selector: 'jhi-vehicle-brands-delete-dialog',
  templateUrl: './vehicle-brands-delete-dialog.component.html'
})
export class VehicleBrandsDeleteDialogComponent {
  vehicleBrands: IVehicleBrands;

  constructor(
    protected vehicleBrandsService: VehicleBrandsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.vehicleBrandsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vehicleBrandsListModification',
        content: 'Deleted an vehicleBrands'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vehicle-brands-delete-popup',
  template: ''
})
export class VehicleBrandsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicleBrands }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VehicleBrandsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vehicleBrands = vehicleBrands;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vehicle-brands', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vehicle-brands', { outlets: { popup: null } }]);
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
