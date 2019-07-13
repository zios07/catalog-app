import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICatalogs } from 'app/shared/model/catalogs.model';
import { AccountService } from 'app/core';
import { CatalogsService } from './catalogs.service';

@Component({
  selector: 'jhi-catalogs',
  templateUrl: './catalogs.component.html'
})
export class CatalogsComponent implements OnInit, OnDestroy {
  catalogs: ICatalogs[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected catalogsService: CatalogsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.catalogsService
      .query()
      .pipe(
        filter((res: HttpResponse<ICatalogs[]>) => res.ok),
        map((res: HttpResponse<ICatalogs[]>) => res.body)
      )
      .subscribe(
        (res: ICatalogs[]) => {
          this.catalogs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCatalogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICatalogs) {
    return item.id;
  }

  registerChangeInCatalogs() {
    this.eventSubscriber = this.eventManager.subscribe('catalogsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
