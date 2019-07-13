import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INationalities, Nationalities } from 'app/shared/model/nationalities.model';
import { NationalitiesService } from './nationalities.service';

@Component({
  selector: 'jhi-nationalities-update',
  templateUrl: './nationalities-update.component.html'
})
export class NationalitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nationalityName: [null, [Validators.required, Validators.maxLength(40)]]
  });

  constructor(protected nationalitiesService: NationalitiesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ nationalities }) => {
      this.updateForm(nationalities);
    });
  }

  updateForm(nationalities: INationalities) {
    this.editForm.patchValue({
      id: nationalities.id,
      nationalityName: nationalities.nationalityName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const nationalities = this.createFromForm();
    if (nationalities.id !== undefined) {
      this.subscribeToSaveResponse(this.nationalitiesService.update(nationalities));
    } else {
      this.subscribeToSaveResponse(this.nationalitiesService.create(nationalities));
    }
  }

  private createFromForm(): INationalities {
    return {
      ...new Nationalities(),
      id: this.editForm.get(['id']).value,
      nationalityName: this.editForm.get(['nationalityName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INationalities>>) {
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
