import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicles } from 'app/shared/model/vehicles.model';
import { VehiclesService } from './vehicles.service';

@Component({
  selector: 'jhi-vehicles-delete-dialog',
  templateUrl: './vehicles-delete-dialog.component.html'
})
export class VehiclesDeleteDialogComponent {
  vehicles: IVehicles;

  constructor(protected vehiclesService: VehiclesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.vehiclesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vehiclesListModification',
        content: 'Deleted an vehicles'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vehicles-delete-popup',
  template: ''
})
export class VehiclesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicles }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VehiclesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vehicles = vehicles;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vehicles', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vehicles', { outlets: { popup: null } }]);
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
