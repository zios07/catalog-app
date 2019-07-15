import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IParts } from 'app/shared/model/parts.model';
import { PartsService } from './parts.service';

@Component({
  selector: 'jhi-parts-detail',
  templateUrl: './parts-detail.component.html'
})
export class PartsDetailComponent implements OnInit {
  parts: IParts;

  constructor(protected activatedRoute: ActivatedRoute, private partsService: PartsService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parts }) => {
      this.parts = parts;
    });
  }

  downloadTechnicalManual() {
    this.partsService.downloadTechnicalManual(this.parts.technicalManual);
  }

  previousState() {
    window.history.back();
  }
}
