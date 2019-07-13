export interface INationalities {
  id?: number;
  nationalityName?: string;
}

export class Nationalities implements INationalities {
  constructor(public id?: number, public nationalityName?: string) {}
}
