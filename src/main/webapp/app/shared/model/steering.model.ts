export interface ISteering {
  id?: number;
  steeringName?: string;
  steeringImage?: string;
}

export class Steering implements ISteering {
  constructor(public id?: number, public steeringName?: string, public steeringImage?: string) {}
}
