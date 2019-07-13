import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILines, Lines } from 'app/shared/model/lines.model';
import { LinesService } from './lines.service';
import { ICatalogs } from 'app/shared/model/catalogs.model';
import { CatalogsService } from 'app/entities/catalogs';

@Component({
  selector: 'jhi-lines-update',
  templateUrl: './lines-update.component.html'
})
export class LinesUpdateComponent implements OnInit {
  isSaving: boolean;

  catalogs: ICatalogs[];

  editForm = this.fb.group({
    id: [],
    lineName: [null, [Validators.required, Validators.maxLength(40)]],
    lineImage: [],
    lineIcon: [],
    catalogs: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected linesService: LinesService,
    protected catalogsService: CatalogsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ lines }) => {
      this.updateForm(lines);
    });
    this.catalogsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICatalogs[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICatalogs[]>) => response.body)
      )
      .subscribe((res: ICatalogs[]) => (this.catalogs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(lines: ILines) {
    this.editForm.patchValue({
      id: lines.id,
      lineName: lines.lineName,
      lineImage: lines.lineImage,
      lineIcon: lines.lineIcon,
      catalogs: lines.catalogs
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const lines = this.createFromForm();
    if (lines.id !== undefined) {
      this.subscribeToSaveResponse(this.linesService.update(lines));
    } else {
      this.subscribeToSaveResponse(this.linesService.create(lines));
    }
  }

  private createFromForm(): ILines {
    return {
      ...new Lines(),
      id: this.editForm.get(['id']).value,
      lineName: this.editForm.get(['lineName']).value,
      lineImage: this.editForm.get(['lineImage']).value,
      lineIcon: this.editForm.get(['lineIcon']).value,
      catalogs: this.editForm.get(['catalogs']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILines>>) {
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

  trackCatalogsById(index: number, item: ICatalogs) {
    return item.id;
  }
}
