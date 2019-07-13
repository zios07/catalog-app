import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INationalities } from 'app/shared/model/nationalities.model';

@Component({
  selector: 'jhi-nationalities-detail',
  templateUrl: './nationalities-detail.component.html'
})
export class NationalitiesDetailComponent implements OnInit {
  nationalities: INationalities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ nationalities }) => {
      this.nationalities = nationalities;
    });
  }

  previousState() {
    window.history.back();
  }
}
