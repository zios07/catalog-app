import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPartsImages, PartsImages } from 'app/shared/model/parts-images.model';
import { PartsImagesService } from './parts-images.service';
import { IParts } from 'app/shared/model/parts.model';
import { PartsService } from 'app/entities/parts';

@Component({
  selector: 'jhi-parts-images-update',
  templateUrl: './parts-images-update.component.html'
})
export class PartsImagesUpdateComponent implements OnInit {
  isSaving: boolean;

  parts: IParts[];

  editForm = this.fb.group({
    id: [],
    partImage: [],
    parts: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partsImagesService: PartsImagesService,
    protected partsService: PartsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partsImages }) => {
      this.updateForm(partsImages);
    });
    this.partsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParts[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParts[]>) => response.body)
      )
      .subscribe((res: IParts[]) => (this.parts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(partsImages: IPartsImages) {
    this.editForm.patchValue({
      id: partsImages.id,
      partImage: partsImages.partImage,
      parts: partsImages.parts
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partsImages = this.createFromForm();
    if (partsImages.id !== undefined) {
      this.subscribeToSaveResponse(this.partsImagesService.update(partsImages));
    } else {
      this.subscribeToSaveResponse(this.partsImagesService.create(partsImages));
    }
  }

  private createFromForm(): IPartsImages {
    return {
      ...new PartsImages(),
      id: this.editForm.get(['id']).value,
      partImage: this.editForm.get(['partImage']).value,
      parts: this.editForm.get(['parts']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartsImages>>) {
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
}
