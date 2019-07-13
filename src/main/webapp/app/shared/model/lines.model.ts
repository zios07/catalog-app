import { IFamilies } from 'app/shared/model/families.model';
import { ICatalogs } from 'app/shared/model/catalogs.model';

export interface ILines {
  id?: number;
  lineName?: string;
  lineImage?: string;
  lineIcon?: string;
  families?: IFamilies[];
  catalogs?: ICatalogs;
}

export class Lines implements ILines {
  constructor(
    public id?: number,
    public lineName?: string,
    public lineImage?: string,
    public lineIcon?: string,
    public families?: IFamilies[],
    public catalogs?: ICatalogs
  ) {}
}
