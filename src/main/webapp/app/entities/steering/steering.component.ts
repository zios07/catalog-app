import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISteering } from 'app/shared/model/steering.model';
import { AccountService } from 'app/core';
import { SteeringService } from './steering.service';

@Component({
  selector: 'jhi-steering',
  templateUrl: './steering.component.html'
})
export class SteeringComponent implements OnInit, OnDestroy {
  steerings: ISteering[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected steeringService: SteeringService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.steeringService
      .query()
      .pipe(
        filter((res: HttpResponse<ISteering[]>) => res.ok),
        map((res: HttpResponse<ISteering[]>) => res.body)
      )
      .subscribe(
        (res: ISteering[]) => {
          this.steerings = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSteerings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISteering) {
    return item.id;
  }

  registerChangeInSteerings() {
    this.eventSubscriber = this.eventManager.subscribe('steeringListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
