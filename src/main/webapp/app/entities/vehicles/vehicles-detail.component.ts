import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicles } from 'app/shared/model/vehicles.model';

@Component({
  selector: 'jhi-vehicles-detail',
  templateUrl: './vehicles-detail.component.html'
})
export class VehiclesDetailComponent implements OnInit {
  vehicles: IVehicles;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicles }) => {
      this.vehicles = vehicles;
    });
  }

  previousState() {
    window.history.back();
  }
}
