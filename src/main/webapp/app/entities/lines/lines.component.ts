import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILines } from 'app/shared/model/lines.model';
import { AccountService } from 'app/core';
import { LinesService } from './lines.service';

@Component({
  selector: 'jhi-lines',
  templateUrl: './lines.component.html'
})
export class LinesComponent implements OnInit, OnDestroy {
  lines: ILines[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected linesService: LinesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.linesService
      .query()
      .pipe(
        filter((res: HttpResponse<ILines[]>) => res.ok),
        map((res: HttpResponse<ILines[]>) => res.body)
      )
      .subscribe(
        (res: ILines[]) => {
          this.lines = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLines();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILines) {
    return item.id;
  }

  registerChangeInLines() {
    this.eventSubscriber = this.eventManager.subscribe('linesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
