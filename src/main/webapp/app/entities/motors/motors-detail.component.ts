import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMotors } from 'app/shared/model/motors.model';

@Component({
  selector: 'jhi-motors-detail',
  templateUrl: './motors-detail.component.html'
})
export class MotorsDetailComponent implements OnInit {
  motors: IMotors;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ motors }) => {
      this.motors = motors;
    });
  }

  previousState() {
    window.history.back();
  }
}
