export interface IProviders {
  id?: number;
  providerName?: string;
  manufacturer?: boolean;
}

export class Providers implements IProviders {
  constructor(public id?: number, public providerName?: string, public manufacturer?: boolean) {
    this.manufacturer = this.manufacturer || false;
  }
}
