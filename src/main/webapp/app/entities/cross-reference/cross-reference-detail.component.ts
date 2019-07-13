import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrossReference } from 'app/shared/model/cross-reference.model';

@Component({
  selector: 'jhi-cross-reference-detail',
  templateUrl: './cross-reference-detail.component.html'
})
export class CrossReferenceDetailComponent implements OnInit {
  crossReference: ICrossReference;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ crossReference }) => {
      this.crossReference = crossReference;
    });
  }

  previousState() {
    window.history.back();
  }
}
