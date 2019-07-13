import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICharacteristics } from 'app/shared/model/characteristics.model';
import { AccountService } from 'app/core';
import { CharacteristicsService } from './characteristics.service';

@Component({
  selector: 'jhi-characteristics',
  templateUrl: './characteristics.component.html'
})
export class CharacteristicsComponent implements OnInit, OnDestroy {
  characteristics: ICharacteristics[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected characteristicsService: CharacteristicsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.characteristicsService
      .query()
      .pipe(
        filter((res: HttpResponse<ICharacteristics[]>) => res.ok),
        map((res: HttpResponse<ICharacteristics[]>) => res.body)
      )
      .subscribe(
        (res: ICharacteristics[]) => {
          this.characteristics = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCharacteristics();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICharacteristics) {
    return item.id;
  }

  registerChangeInCharacteristics() {
    this.eventSubscriber = this.eventManager.subscribe('characteristicsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
