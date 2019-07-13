import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICatalogs } from 'app/shared/model/catalogs.model';

@Component({
  selector: 'jhi-catalogs-detail',
  templateUrl: './catalogs-detail.component.html'
})
export class CatalogsDetailComponent implements OnInit {
  catalogs: ICatalogs;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ catalogs }) => {
      this.catalogs = catalogs;
    });
  }

  previousState() {
    window.history.back();
  }
}
