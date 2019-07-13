import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProviders, Providers } from 'app/shared/model/providers.model';
import { ProvidersService } from './providers.service';

@Component({
  selector: 'jhi-providers-update',
  templateUrl: './providers-update.component.html'
})
export class ProvidersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    providerName: [null, [Validators.required, Validators.maxLength(40)]],
    manufacturer: []
  });

  constructor(protected providersService: ProvidersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ providers }) => {
      this.updateForm(providers);
    });
  }

  updateForm(providers: IProviders) {
    this.editForm.patchValue({
      id: providers.id,
      providerName: providers.providerName,
      manufacturer: providers.manufacturer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const providers = this.createFromForm();
    if (providers.id !== undefined) {
      this.subscribeToSaveResponse(this.providersService.update(providers));
    } else {
      this.subscribeToSaveResponse(this.providersService.create(providers));
    }
  }

  private createFromForm(): IProviders {
    return {
      ...new Providers(),
      id: this.editForm.get(['id']).value,
      providerName: this.editForm.get(['providerName']).value,
      manufacturer: this.editForm.get(['manufacturer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProviders>>) {
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
