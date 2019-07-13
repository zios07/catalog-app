import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISteering, Steering } from 'app/shared/model/steering.model';
import { SteeringService } from './steering.service';

@Component({
  selector: 'jhi-steering-update',
  templateUrl: './steering-update.component.html'
})
export class SteeringUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    steeringName: [null, [Validators.required, Validators.maxLength(40)]],
    steeringImage: []
  });

  constructor(protected steeringService: SteeringService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ steering }) => {
      this.updateForm(steering);
    });
  }

  updateForm(steering: ISteering) {
    this.editForm.patchValue({
      id: steering.id,
      steeringName: steering.steeringName,
      steeringImage: steering.steeringImage
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const steering = this.createFromForm();
    if (steering.id !== undefined) {
      this.subscribeToSaveResponse(this.steeringService.update(steering));
    } else {
      this.subscribeToSaveResponse(this.steeringService.create(steering));
    }
  }

  private createFromForm(): ISteering {
    return {
      ...new Steering(),
      id: this.editForm.get(['id']).value,
      steeringName: this.editForm.get(['steeringName']).value,
      steeringImage: this.editForm.get(['steeringImage']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISteering>>) {
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
