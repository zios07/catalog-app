import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartsImages } from 'app/shared/model/parts-images.model';

@Component({
  selector: 'jhi-parts-images-detail',
  templateUrl: './parts-images-detail.component.html'
})
export class PartsImagesDetailComponent implements OnInit {
  partsImages: IPartsImages;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partsImages }) => {
      this.partsImages = partsImages;
    });
  }

  previousState() {
    window.history.back();
  }
}
