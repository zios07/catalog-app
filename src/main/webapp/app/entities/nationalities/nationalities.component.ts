import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INationalities } from 'app/shared/model/nationalities.model';
import { AccountService } from 'app/core';
import { NationalitiesService } from './nationalities.service';

@Component({
  selector: 'jhi-nationalities',
  templateUrl: './nationalities.component.html'
})
export class NationalitiesComponent implements OnInit, OnDestroy {
  nationalities: INationalities[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected nationalitiesService: NationalitiesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.nationalitiesService
      .query()
      .pipe(
        filter((res: HttpResponse<INationalities[]>) => res.ok),
        map((res: HttpResponse<INationalities[]>) => res.body)
      )
      .subscribe(
        (res: INationalities[]) => {
          this.nationalities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNationalities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INationalities) {
    return item.id;
  }

  registerChangeInNationalities() {
    this.eventSubscriber = this.eventManager.subscribe('nationalitiesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
