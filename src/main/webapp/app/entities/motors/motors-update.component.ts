import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMotors, Motors } from 'app/shared/model/motors.model';
import { MotorsService } from './motors.service';

@Component({
  selector: 'jhi-motors-update',
  templateUrl: './motors-update.component.html'
})
export class MotorsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    motorName: [null, [Validators.required, Validators.maxLength(40)]]
  });

  constructor(protected motorsService: MotorsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ motors }) => {
      this.updateForm(motors);
    });
  }

  updateForm(motors: IMotors) {
    this.editForm.patchValue({
      id: motors.id,
      motorName: motors.motorName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const motors = this.createFromForm();
    if (motors.id !== undefined) {
      this.subscribeToSaveResponse(this.motorsService.update(motors));
    } else {
      this.subscribeToSaveResponse(this.motorsService.create(motors));
    }
  }

  private createFromForm(): IMotors {
    return {
      ...new Motors(),
      id: this.editForm.get(['id']).value,
      motorName: this.editForm.get(['motorName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotors>>) {
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
