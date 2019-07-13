import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVehicleBrands, VehicleBrands } from 'app/shared/model/vehicle-brands.model';
import { VehicleBrandsService } from './vehicle-brands.service';

@Component({
  selector: 'jhi-vehicle-brands-update',
  templateUrl: './vehicle-brands-update.component.html'
})
export class VehicleBrandsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    vehicleBrandName: [null, [Validators.required, Validators.maxLength(40)]],
    vehicleBrandImage: []
  });

  constructor(protected vehicleBrandsService: VehicleBrandsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vehicleBrands }) => {
      this.updateForm(vehicleBrands);
    });
  }

  updateForm(vehicleBrands: IVehicleBrands) {
    this.editForm.patchValue({
      id: vehicleBrands.id,
      vehicleBrandName: vehicleBrands.vehicleBrandName,
      vehicleBrandImage: vehicleBrands.vehicleBrandImage
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vehicleBrands = this.createFromForm();
    if (vehicleBrands.id !== undefined) {
      this.subscribeToSaveResponse(this.vehicleBrandsService.update(vehicleBrands));
    } else {
      this.subscribeToSaveResponse(this.vehicleBrandsService.create(vehicleBrands));
    }
  }

  private createFromForm(): IVehicleBrands {
    return {
      ...new VehicleBrands(),
      id: this.editForm.get(['id']).value,
      vehicleBrandName: this.editForm.get(['vehicleBrandName']).value,
      vehicleBrandImage: this.editForm.get(['vehicleBrandImage']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleBrands>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
