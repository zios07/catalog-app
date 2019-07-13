import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParts } from 'app/shared/model/parts.model';

@Component({
  selector: 'jhi-parts-detail',
  templateUrl: './parts-detail.component.html'
})
export class PartsDetailComponent implements OnInit {
  parts: IParts;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parts }) => {
      this.parts = parts;
    });
  }

  previousState() {
    window.history.back();
  }
}
