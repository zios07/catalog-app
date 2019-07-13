import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleModels } from 'app/shared/model/vehicle-models.model';
import { VehicleModelsService } from './vehicle-models.service';

@Component({
  selector: 'jhi-vehicle-models-delete-dialog',
  templateUrl: './vehicle-models-delete-dialog.component.html'
})
export class VehicleModelsDeleteDialogComponent {
  vehicleModels: IVehicleModels;

  constructor(
    protected vehicleModelsService: VehicleModelsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.vehicleModelsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vehicleModelsListModification',
        content: 'Deleted an vehicleModels'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vehicle-models-delete-popup',
  template: ''
})
export class VehicleModelsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicleModels }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VehicleModelsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vehicleModels = vehicleModels;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vehicle-models', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vehicle-models', { outlets: { popup: null } }]);
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
