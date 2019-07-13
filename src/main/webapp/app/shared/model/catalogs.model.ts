import { ILines } from 'app/shared/model/lines.model';
import { IUser } from 'app/core/user/user.model';

export interface ICatalogs {
  id?: number;
  catalogName?: string;
  catalogoImagemCover1?: string;
  catalogoImagemCover2?: string;
  catalogoImagemCover3?: string;
  catalogoImagemCover4?: string;
  lines?: ILines[];
  user?: IUser;
}

export class Catalogs implements ICatalogs {
  constructor(
    public id?: number,
    public catalogName?: string,
    public catalogoImagemCover1?: string,
    public catalogoImagemCover2?: string,
    public catalogoImagemCover3?: string,
    public catalogoImagemCover4?: string,
    public lines?: ILines[],
    public user?: IUser
  ) {}
}
