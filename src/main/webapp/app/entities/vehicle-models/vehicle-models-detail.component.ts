import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleModels } from 'app/shared/model/vehicle-models.model';

@Component({
  selector: 'jhi-vehicle-models-detail',
  templateUrl: './vehicle-models-detail.component.html'
})
export class VehicleModelsDetailComponent implements OnInit {
  vehicleModels: IVehicleModels;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicleModels }) => {
      this.vehicleModels = vehicleModels;
    });
  }

  previousState() {
    window.history.back();
  }
}
