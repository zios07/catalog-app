import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPartsCharacteristics, PartsCharacteristics } from 'app/shared/model/parts-characteristics.model';
import { PartsCharacteristicsService } from './parts-characteristics.service';
import { IParts } from 'app/shared/model/parts.model';
import { PartsService } from 'app/entities/parts';
import { ICharacteristics } from 'app/shared/model/characteristics.model';
import { CharacteristicsService } from 'app/entities/characteristics';

@Component({
  selector: 'jhi-parts-characteristics-update',
  templateUrl: './parts-characteristics-update.component.html'
})
export class PartsCharacteristicsUpdateComponent implements OnInit {
  isSaving: boolean;

  parts: IParts[];

  characteristics: ICharacteristics[];

  editForm = this.fb.group({
    id: [],
    information: [],
    parts: [],
    characteristics: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partsCharacteristicsService: PartsCharacteristicsService,
    protected partsService: PartsService,
    protected characteristicsService: CharacteristicsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partsCharacteristics }) => {
      this.updateForm(partsCharacteristics);
    });
    this.partsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParts[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParts[]>) => response.body)
      )
      .subscribe((res: IParts[]) => (this.parts = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.characteristicsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICharacteristics[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICharacteristics[]>) => response.body)
      )
      .subscribe((res: ICharacteristics[]) => (this.characteristics = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(partsCharacteristics: IPartsCharacteristics) {
    this.editForm.patchValue({
      id: partsCharacteristics.id,
      information: partsCharacteristics.information,
      parts: partsCharacteristics.parts,
      characteristics: partsCharacteristics.characteristics
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partsCharacteristics = this.createFromForm();
    if (partsCharacteristics.id !== undefined) {
      this.subscribeToSaveResponse(this.partsCharacteristicsService.update(partsCharacteristics));
    } else {
      this.subscribeToSaveResponse(this.partsCharacteristicsService.create(partsCharacteristics));
    }
  }

  private createFromForm(): IPartsCharacteristics {
    return {
      ...new PartsCharacteristics(),
      id: this.editForm.get(['id']).value,
      information: this.editForm.get(['information']).value,
      parts: this.editForm.get(['parts']).value,
      characteristics: this.editForm.get(['characteristics']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartsCharacteristics>>) {
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

  trackPartsById(index: number, item: IParts) {
    return item.id;
  }

  trackCharacteristicsById(index: number, item: ICharacteristics) {
    return item.id;
  }
}
