import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProviders } from 'app/shared/model/providers.model';
import { AccountService } from 'app/core';
import { ProvidersService } from './providers.service';

@Component({
  selector: 'jhi-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent implements OnInit, OnDestroy {
  providers: IProviders[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected providersService: ProvidersService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.providersService
      .query()
      .pipe(
        filter((res: HttpResponse<IProviders[]>) => res.ok),
        map((res: HttpResponse<IProviders[]>) => res.body)
      )
      .subscribe(
        (res: IProviders[]) => {
          this.providers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProviders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProviders) {
    return item.id;
  }

  registerChangeInProviders() {
    this.eventSubscriber = this.eventManager.subscribe('providersListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
