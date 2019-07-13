import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVehicles, Vehicles } from 'app/shared/model/vehicles.model';
import { VehiclesService } from './vehicles.service';
import { IVehicleBrands } from 'app/shared/model/vehicle-brands.model';
import { VehicleBrandsService } from 'app/entities/vehicle-brands';

@Component({
  selector: 'jhi-vehicles-update',
  templateUrl: './vehicles-update.component.html'
})
export class VehiclesUpdateComponent implements OnInit {
  isSaving: boolean;

  vehiclebrands: IVehicleBrands[];

  editForm = this.fb.group({
    id: [],
    vehicle: [null, [Validators.required, Validators.maxLength(40)]],
    code: [null, [Validators.maxLength(10)]],
    vehicleBrands: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected vehiclesService: VehiclesService,
    protected vehicleBrandsService: VehicleBrandsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vehicles }) => {
      this.updateForm(vehicles);
    });
    this.vehicleBrandsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehicleBrands[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehicleBrands[]>) => response.body)
      )
      .subscribe((res: IVehicleBrands[]) => (this.vehiclebrands = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vehicles: IVehicles) {
    this.editForm.patchValue({
      id: vehicles.id,
      vehicle: vehicles.vehicle,
      code: vehicles.code,
      vehicleBrands: vehicles.vehicleBrands
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vehicles = this.createFromForm();
    if (vehicles.id !== undefined) {
      this.subscribeToSaveResponse(this.vehiclesService.update(vehicles));
    } else {
      this.subscribeToSaveResponse(this.vehiclesService.create(vehicles));
    }
  }

  private createFromForm(): IVehicles {
    return {
      ...new Vehicles(),
      id: this.editForm.get(['id']).value,
      vehicle: this.editForm.get(['vehicle']).value,
      code: this.editForm.get(['code']).value,
      vehicleBrands: this.editForm.get(['vehicleBrands']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicles>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVehicleBrandsById(index: number, item: IVehicleBrands) {
    return item.id;
  }
}
