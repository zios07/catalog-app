import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITransmission, Transmission } from 'app/shared/model/transmission.model';
import { TransmissionService } from './transmission.service';

@Component({
  selector: 'jhi-transmission-update',
  templateUrl: './transmission-update.component.html'
})
export class TransmissionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    transmissionName: [null, [Validators.required, Validators.maxLength(40)]],
    transmissaoImage: []
  });

  constructor(protected transmissionService: TransmissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transmission }) => {
      this.updateForm(transmission);
    });
  }

  updateForm(transmission: ITransmission) {
    this.editForm.patchValue({
      id: transmission.id,
      transmissionName: transmission.transmissionName,
      transmissaoImage: transmission.transmissaoImage
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transmission = this.createFromForm();
    if (transmission.id !== undefined) {
      this.subscribeToSaveResponse(this.transmissionService.update(transmission));
    } else {
      this.subscribeToSaveResponse(this.transmissionService.create(transmission));
    }
  }

  private createFromForm(): ITransmission {
    return {
      ...new Transmission(),
      id: this.editForm.get(['id']).value,
      transmissionName: this.editForm.get(['transmissionName']).value,
      transmissaoImage: this.editForm.get(['transmissaoImage']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransmission>>) {
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
