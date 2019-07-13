export interface IMotors {
  id?: number;
  motorName?: string;
}

export class Motors implements IMotors {
  constructor(public id?: number, public motorName?: string) {}
}
