import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISteering } from 'app/shared/model/steering.model';

@Component({
  selector: 'jhi-steering-detail',
  templateUrl: './steering-detail.component.html'
})
export class SteeringDetailComponent implements OnInit {
  steering: ISteering;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ steering }) => {
      this.steering = steering;
    });
  }

  previousState() {
    window.history.back();
  }
}
