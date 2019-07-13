import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICharacteristics, Characteristics } from 'app/shared/model/characteristics.model';
import { CharacteristicsService } from './characteristics.service';
import { IFamilies } from 'app/shared/model/families.model';
import { FamiliesService } from 'app/entities/families';

@Component({
  selector: 'jhi-characteristics-update',
  templateUrl: './characteristics-update.component.html'
})
export class CharacteristicsUpdateComponent implements OnInit {
  isSaving: boolean;

  families: IFamilies[];

  editForm = this.fb.group({
    id: [],
    characteristicsName: [null, [Validators.required, Validators.maxLength(30)]],
    viewCatalog: [],
    viewSpecialClient: [],
    families: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected characteristicsService: CharacteristicsService,
    protected familiesService: FamiliesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ characteristics }) => {
      this.updateForm(characteristics);
    });
    this.familiesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFamilies[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFamilies[]>) => response.body)
      )
      .subscribe((res: IFamilies[]) => (this.families = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(characteristics: ICharacteristics) {
    this.editForm.patchValue({
      id: characteristics.id,
      characteristicsName: characteristics.characteristicsName,
      viewCatalog: characteristics.viewCatalog,
      viewSpecialClient: characteristics.viewSpecialClient,
      families: characteristics.families
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const characteristics = this.createFromForm();
    if (characteristics.id !== undefined) {
      this.subscribeToSaveResponse(this.characteristicsService.update(characteristics));
    } else {
      this.subscribeToSaveResponse(this.characteristicsService.create(characteristics));
    }
  }

  private createFromForm(): ICharacteristics {
    return {
      ...new Characteristics(),
      id: this.editForm.get(['id']).value,
      characteristicsName: this.editForm.get(['characteristicsName']).value,
      viewCatalog: this.editForm.get(['viewCatalog']).value,
      viewSpecialClient: this.editForm.get(['viewSpecialClient']).value,
      families: this.editForm.get(['families']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICharacteristics>>) {
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

  trackFamiliesById(index: number, item: IFamilies) {
    return item.id;
  }
}
