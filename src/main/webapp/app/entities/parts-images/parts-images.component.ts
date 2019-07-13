import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPartsImages } from 'app/shared/model/parts-images.model';
import { AccountService } from 'app/core';
import { PartsImagesService } from './parts-images.service';

@Component({
  selector: 'jhi-parts-images',
  templateUrl: './parts-images.component.html'
})
export class PartsImagesComponent implements OnInit, OnDestroy {
  partsImages: IPartsImages[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected partsImagesService: PartsImagesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.partsImagesService
      .query()
      .pipe(
        filter((res: HttpResponse<IPartsImages[]>) => res.ok),
        map((res: HttpResponse<IPartsImages[]>) => res.body)
      )
      .subscribe(
        (res: IPartsImages[]) => {
          this.partsImages = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPartsImages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPartsImages) {
    return item.id;
  }

  registerChangeInPartsImages() {
    this.eventSubscriber = this.eventManager.subscribe('partsImagesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
