import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartsCharacteristics } from 'app/shared/model/parts-characteristics.model';

@Component({
  selector: 'jhi-parts-characteristics-detail',
  templateUrl: './parts-characteristics-detail.component.html'
})
export class PartsCharacteristicsDetailComponent implements OnInit {
  partsCharacteristics: IPartsCharacteristics;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partsCharacteristics }) => {
      this.partsCharacteristics = partsCharacteristics;
    });
  }

  previousState() {
    window.history.back();
  }
}
