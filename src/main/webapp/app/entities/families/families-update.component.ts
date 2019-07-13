import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFamilies, Families } from 'app/shared/model/families.model';
import { FamiliesService } from './families.service';
import { ILines } from 'app/shared/model/lines.model';
import { LinesService } from 'app/entities/lines';

@Component({
  selector: 'jhi-families-update',
  templateUrl: './families-update.component.html'
})
export class FamiliesUpdateComponent implements OnInit {
  isSaving: boolean;

  lines: ILines[];

  editForm = this.fb.group({
    id: [],
    familyName: [null, [Validators.required, Validators.maxLength(40)]],
    familyImage: [],
    familyIcon: [],
    lines: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected familiesService: FamiliesService,
    protected linesService: LinesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ families }) => {
      this.updateForm(families);
    });
    this.linesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILines[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILines[]>) => response.body)
      )
      .subscribe((res: ILines[]) => (this.lines = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(families: IFamilies) {
    this.editForm.patchValue({
      id: families.id,
      familyName: families.familyName,
      familyImage: families.familyImage,
      familyIcon: families.familyIcon,
      lines: families.lines
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const families = this.createFromForm();
    if (families.id !== undefined) {
      this.subscribeToSaveResponse(this.familiesService.update(families));
    } else {
      this.subscribeToSaveResponse(this.familiesService.create(families));
    }
  }

  private createFromForm(): IFamilies {
    return {
      ...new Families(),
      id: this.editForm.get(['id']).value,
      familyName: this.editForm.get(['familyName']).value,
      familyImage: this.editForm.get(['familyImage']).value,
      familyIcon: this.editForm.get(['familyIcon']).value,
      lines: this.editForm.get(['lines']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFamilies>>) {
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

  trackLinesById(index: number, item: ILines) {
    return item.id;
  }
}
