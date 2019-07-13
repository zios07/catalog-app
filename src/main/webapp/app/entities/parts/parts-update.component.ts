import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParts, Parts } from 'app/shared/model/parts.model';
import { PartsService } from './parts.service';
import { IVehicleModels } from 'app/shared/model/vehicle-models.model';
import { VehicleModelsService } from 'app/entities/vehicle-models';
import { IFamilies } from 'app/shared/model/families.model';
import { FamiliesService } from 'app/entities/families';

@Component({
  selector: 'jhi-parts-update',
  templateUrl: './parts-update.component.html'
})
export class PartsUpdateComponent implements OnInit {
  isSaving: boolean;

  vehiclemodels: IVehicleModels[];

  families: IFamilies[];

  editForm = this.fb.group({
    id: [],
    codeParts: [null, [Validators.required, Validators.maxLength(30)]],
    partsName: [null, [Validators.required]],
    partImageLinkPic360: [],
    partVideo: [],
    partTechnicalManual: [],
    underDevelopment: [],
    inactive: [],
    ean: [null, [Validators.minLength(13)]],
    sku: [],
    vehicleModels: [],
    families: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partsService: PartsService,
    protected vehicleModelsService: VehicleModelsService,
    protected familiesService: FamiliesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ parts }) => {
      this.updateForm(parts);
    });
    this.vehicleModelsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehicleModels[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehicleModels[]>) => response.body)
      )
      .subscribe((res: IVehicleModels[]) => (this.vehiclemodels = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.familiesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFamilies[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFamilies[]>) => response.body)
      )
      .subscribe((res: IFamilies[]) => (this.families = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(parts: IParts) {
    this.editForm.patchValue({
      id: parts.id,
      codeParts: parts.codeParts,
      partsName: parts.partsName,
      partImageLinkPic360: parts.partImageLinkPic360,
      partVideo: parts.partVideo,
      partTechnicalManual: parts.partTechnicalManual,
      underDevelopment: parts.underDevelopment,
      inactive: parts.inactive,
      ean: parts.ean,
      sku: parts.sku,
      vehicleModels: parts.vehicleModels,
      families: parts.families
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const parts = this.createFromForm();
    if (parts.id !== undefined) {
      this.subscribeToSaveResponse(this.partsService.update(parts));
    } else {
      this.subscribeToSaveResponse(this.partsService.create(parts));
    }
  }

  private createFromForm(): IParts {
    return {
      ...new Parts(),
      id: this.editForm.get(['id']).value,
      codeParts: this.editForm.get(['codeParts']).value,
      partsName: this.editForm.get(['partsName']).value,
      partImageLinkPic360: this.editForm.get(['partImageLinkPic360']).value,
      partVideo: this.editForm.get(['partVideo']).value,
      partTechnicalManual: this.editForm.get(['partTechnicalManual']).value,
      underDevelopment: this.editForm.get(['underDevelopment']).value,
      inactive: this.editForm.get(['inactive']).value,
      ean: this.editForm.get(['ean']).value,
      sku: this.editForm.get(['sku']).value,
      vehicleModels: this.editForm.get(['vehicleModels']).value,
      families: this.editForm.get(['families']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParts>>) {
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

  trackVehicleModelsById(index: number, item: IVehicleModels) {
    return item.id;
  }

  trackFamiliesById(index: number, item: IFamilies) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
