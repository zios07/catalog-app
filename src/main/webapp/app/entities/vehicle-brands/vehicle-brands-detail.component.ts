import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleBrands } from 'app/shared/model/vehicle-brands.model';

@Component({
  selector: 'jhi-vehicle-brands-detail',
  templateUrl: './vehicle-brands-detail.component.html'
})
export class VehicleBrandsDetailComponent implements OnInit {
  vehicleBrands: IVehicleBrands;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicleBrands }) => {
      this.vehicleBrands = vehicleBrands;
    });
  }

  previousState() {
    window.history.back();
  }
}
