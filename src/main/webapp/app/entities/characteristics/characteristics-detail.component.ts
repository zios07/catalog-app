import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharacteristics } from 'app/shared/model/characteristics.model';

@Component({
  selector: 'jhi-characteristics-detail',
  templateUrl: './characteristics-detail.component.html'
})
export class CharacteristicsDetailComponent implements OnInit {
  characteristics: ICharacteristics;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ characteristics }) => {
      this.characteristics = characteristics;
    });
  }

  previousState() {
    window.history.back();
  }
}
