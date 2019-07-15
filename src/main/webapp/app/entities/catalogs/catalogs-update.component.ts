import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { Catalogs, ICatalogs } from 'app/shared/model/catalogs.model';
import { CatalogsService } from './catalogs.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-catalogs-update',
  templateUrl: './catalogs-update.component.html'
})
export class CatalogsUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];
  coverImages: [];

  editForm = this.fb.group({
    id: [],
    catalogName: [null, [Validators.required, Validators.maxLength(40)]],
    catalogoImagemCover1: [],
    catalogoImagemCover2: [],
    catalogoImagemCover3: [],
    catalogoImagemCover4: [],
    coverImages: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected catalogsService: CatalogsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ catalogs }) => {
      this.updateForm(catalogs);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  selectCoverImages(event) {
    this.coverImages = event.target.files;
  }

  updateForm(catalogs: ICatalogs) {
    this.editForm.patchValue({
      id: catalogs.id,
      catalogName: catalogs.catalogName,
      catalogoImagemCover1: catalogs.catalogoImagemCover1,
      catalogoImagemCover2: catalogs.catalogoImagemCover2,
      catalogoImagemCover3: catalogs.catalogoImagemCover3,
      catalogoImagemCover4: catalogs.catalogoImagemCover4,
      user: catalogs.user
    });
    // this.coverImages = catalogs.coverImages ? catalogs.coverImages : [];
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const catalogs = this.createFromForm();
    if (catalogs.id !== undefined) {
      this.subscribeToSaveResponse(this.catalogsService.update(catalogs));
    } else {
      this.subscribeToSaveResponse(this.catalogsService.create(catalogs, this.coverImages));
    }
  }

  private createFromForm(): ICatalogs {
    return {
      ...new Catalogs(),
      id: this.editForm.get(['id']).value,
      catalogName: this.editForm.get(['catalogName']).value,
      catalogoImagemCover1: this.editForm.get(['catalogoImagemCover1']).value,
      catalogoImagemCover2: this.editForm.get(['catalogoImagemCover2']).value,
      catalogoImagemCover3: this.editForm.get(['catalogoImagemCover3']).value,
      catalogoImagemCover4: this.editForm.get(['catalogoImagemCover4']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: any) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
