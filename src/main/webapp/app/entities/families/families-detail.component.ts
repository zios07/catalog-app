import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFamilies } from 'app/shared/model/families.model';

@Component({
  selector: 'jhi-families-detail',
  templateUrl: './families-detail.component.html'
})
export class FamiliesDetailComponent implements OnInit {
  families: IFamilies;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ families }) => {
      this.families = families;
    });
  }

  previousState() {
    window.history.back();
  }
}
