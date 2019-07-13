import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IVehicleModels, VehicleModels } from 'app/shared/model/vehicle-models.model';
import { VehicleModelsService } from './vehicle-models.service';
import { IVehicles } from 'app/shared/model/vehicles.model';
import { VehiclesService } from 'app/entities/vehicles';
import { IMotors } from 'app/shared/model/motors.model';
import { MotorsService } from 'app/entities/motors';
import { ITransmission } from 'app/shared/model/transmission.model';
import { TransmissionService } from 'app/entities/transmission';
import { ISteering } from 'app/shared/model/steering.model';
import { SteeringService } from 'app/entities/steering';
import { INationalities } from 'app/shared/model/nationalities.model';
import { NationalitiesService } from 'app/entities/nationalities';
import { IParts } from 'app/shared/model/parts.model';
import { PartsService } from 'app/entities/parts';

@Component({
  selector: 'jhi-vehicle-models-update',
  templateUrl: './vehicle-models-update.component.html'
})
export class VehicleModelsUpdateComponent implements OnInit {
  isSaving: boolean;

  vehicles: IVehicles[];

  motors: IMotors[];

  transmissions: ITransmission[];

  steerings: ISteering[];

  nationalities: INationalities[];

  parts: IParts[];
  startProductionDp: any;
  finishProductionDp: any;

  editForm = this.fb.group({
    id: [],
    vehicleModel: [null, [Validators.required, Validators.maxLength(40)]],
    startProduction: [],
    finishProduction: [],
    startChassi: [null, [Validators.minLength(17)]],
    fineshChassi: [null, [Validators.minLength(17)]],
    code: [null, [Validators.maxLength(10)]],
    fleetQuantity: [],
    vehicles: [],
    motors: [],
    transmission: [],
    steering: [],
    nationalities: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected vehicleModelsService: VehicleModelsService,
    protected vehiclesService: VehiclesService,
    protected motorsService: MotorsService,
    protected transmissionService: TransmissionService,
    protected steeringService: SteeringService,
    protected nationalitiesService: NationalitiesService,
    protected partsService: PartsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vehicleModels }) => {
      this.updateForm(vehicleModels);
    });
    this.vehiclesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehicles[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehicles[]>) => response.body)
      )
      .subscribe((res: IVehicles[]) => (this.vehicles = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.motorsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMotors[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMotors[]>) => response.body)
      )
      .subscribe((res: IMotors[]) => (this.motors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.transmissionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITransmission[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITransmission[]>) => response.body)
      )
      .subscribe((res: ITransmission[]) => (this.transmissions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.steeringService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISteering[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISteering[]>) => response.body)
      )
      .subscribe((res: ISteering[]) => (this.steerings = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.nationalitiesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INationalities[]>) => mayBeOk.ok),
        map((response: HttpResponse<INationalities[]>) => response.body)
      )
      .subscribe((res: INationalities[]) => (this.nationalities = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.partsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParts[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParts[]>) => response.body)
      )
      .subscribe((res: IParts[]) => (this.parts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vehicleModels: IVehicleModels) {
    this.editForm.patchValue({
      id: vehicleModels.id,
      vehicleModel: vehicleModels.vehicleModel,
      startProduction: vehicleModels.startProduction,
      finishProduction: vehicleModels.finishProduction,
      startChassi: vehicleModels.startChassi,
      fineshChassi: vehicleModels.fineshChassi,
      code: vehicleModels.code,
      fleetQuantity: vehicleModels.fleetQuantity,
      vehicles: vehicleModels.vehicles,
      motors: vehicleModels.motors,
      transmission: vehicleModels.transmission,
      steering: vehicleModels.steering,
      nationalities: vehicleModels.nationalities
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vehicleModels = this.createFromForm();
    if (vehicleModels.id !== undefined) {
      this.subscribeToSaveResponse(this.vehicleModelsService.update(vehicleModels));
    } else {
      this.subscribeToSaveResponse(this.vehicleModelsService.create(vehicleModels));
    }
  }

  private createFromForm(): IVehicleModels {
    return {
      ...new VehicleModels(),
      id: this.editForm.get(['id']).value,
      vehicleModel: this.editForm.get(['vehicleModel']).value,
      startProduction: this.editForm.get(['startProduction']).value,
      finishProduction: this.editForm.get(['finishProduction']).value,
      startChassi: this.editForm.get(['startChassi']).value,
      fineshChassi: this.editForm.get(['fineshChassi']).value,
      code: this.editForm.get(['code']).value,
      fleetQuantity: this.editForm.get(['fleetQuantity']).value,
      vehicles: this.editForm.get(['vehicles']).value,
      motors: this.editForm.get(['motors']).value,
      transmission: this.editForm.get(['transmission']).value,
      steering: this.editForm.get(['steering']).value,
      nationalities: this.editForm.get(['nationalities']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleModels>>) {
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

  trackVehiclesById(index: number, item: IVehicles) {
    return item.id;
  }

  trackMotorsById(index: number, item: IMotors) {
    return item.id;
  }

  trackTransmissionById(index: number, item: ITransmission) {
    return item.id;
  }

  trackSteeringById(index: number, item: ISteering) {
    return item.id;
  }

  trackNationalitiesById(index: number, item: INationalities) {
    return item.id;
  }

  trackPartsById(index: number, item: IParts) {
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
