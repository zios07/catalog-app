import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransmission } from 'app/shared/model/transmission.model';
import { AccountService } from 'app/core';
import { TransmissionService } from './transmission.service';

@Component({
  selector: 'jhi-transmission',
  templateUrl: './transmission.component.html'
})
export class TransmissionComponent implements OnInit, OnDestroy {
  transmissions: ITransmission[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected transmissionService: TransmissionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.transmissionService
      .query()
      .pipe(
        filter((res: HttpResponse<ITransmission[]>) => res.ok),
        map((res: HttpResponse<ITransmission[]>) => res.body)
      )
      .subscribe(
        (res: ITransmission[]) => {
          this.transmissions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTransmissions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransmission) {
    return item.id;
  }

  registerChangeInTransmissions() {
    this.eventSubscriber = this.eventManager.subscribe('transmissionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
