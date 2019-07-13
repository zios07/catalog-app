import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICrossReference, CrossReference } from 'app/shared/model/cross-reference.model';
import { CrossReferenceService } from './cross-reference.service';
import { IProviders } from 'app/shared/model/providers.model';
import { ProvidersService } from 'app/entities/providers';
import { IParts } from 'app/shared/model/parts.model';
import { PartsService } from 'app/entities/parts';

@Component({
  selector: 'jhi-cross-reference-update',
  templateUrl: './cross-reference-update.component.html'
})
export class CrossReferenceUpdateComponent implements OnInit {
  isSaving: boolean;

  providers: IProviders[];

  parts: IParts[];

  editForm = this.fb.group({
    id: [],
    codeInProvider: [null, [Validators.required, Validators.maxLength(30)]],
    viewCatalog: [],
    providers: [],
    parts: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected crossReferenceService: CrossReferenceService,
    protected providersService: ProvidersService,
    protected partsService: PartsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ crossReference }) => {
      this.updateForm(crossReference);
    });
    this.providersService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProviders[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProviders[]>) => response.body)
      )
      .subscribe((res: IProviders[]) => (this.providers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.partsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParts[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParts[]>) => response.body)
      )
      .subscribe((res: IParts[]) => (this.parts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(crossReference: ICrossReference) {
    this.editForm.patchValue({
      id: crossReference.id,
      codeInProvider: crossReference.codeInProvider,
      viewCatalog: crossReference.viewCatalog,
      providers: crossReference.providers,
      parts: crossReference.parts
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const crossReference = this.createFromForm();
    if (crossReference.id !== undefined) {
      this.subscribeToSaveResponse(this.crossReferenceService.update(crossReference));
    } else {
      this.subscribeToSaveResponse(this.crossReferenceService.create(crossReference));
    }
  }

  private createFromForm(): ICrossReference {
    return {
      ...new CrossReference(),
      id: this.editForm.get(['id']).value,
      codeInProvider: this.editForm.get(['codeInProvider']).value,
      viewCatalog: this.editForm.get(['viewCatalog']).value,
      providers: this.editForm.get(['providers']).value,
      parts: this.editForm.get(['parts']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrossReference>>) {
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

  trackProvidersById(index: number, item: IProviders) {
    return item.id;
  }

  trackPartsById(index: number, item: IParts) {
    return item.id;
  }
}
