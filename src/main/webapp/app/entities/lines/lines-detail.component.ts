import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILines } from 'app/shared/model/lines.model';

@Component({
  selector: 'jhi-lines-detail',
  templateUrl: './lines-detail.component.html'
})
export class LinesDetailComponent implements OnInit {
  lines: ILines;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ lines }) => {
      this.lines = lines;
    });
  }

  previousState() {
    window.history.back();
  }
}
