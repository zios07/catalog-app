import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransmission } from 'app/shared/model/transmission.model';

@Component({
  selector: 'jhi-transmission-detail',
  templateUrl: './transmission-detail.component.html'
})
export class TransmissionDetailComponent implements OnInit {
  transmission: ITransmission;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transmission }) => {
      this.transmission = transmission;
    });
  }

  previousState() {
    window.history.back();
  }
}
