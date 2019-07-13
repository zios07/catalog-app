export interface ITransmission {
  id?: number;
  transmissionName?: string;
  transmissaoImage?: string;
}

export class Transmission implements ITransmission {
  constructor(public id?: number, public transmissionName?: string, public transmissaoImage?: string) {}
}
