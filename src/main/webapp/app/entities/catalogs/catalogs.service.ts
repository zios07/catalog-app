import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICatalogs } from 'app/shared/model/catalogs.model';

type EntityResponseType = HttpResponse<ICatalogs>;
type EntityArrayResponseType = HttpResponse<ICatalogs[]>;

@Injectable({ providedIn: 'root' })
export class CatalogsService {
  public resourceUrl = SERVER_API_URL + 'api/catalogs';

  constructor(protected http: HttpClient) {}

  create(catalogs, photos) {
    const fd = new FormData();

    for (let i = 0; i < photos.length; i++) {
      var blob = new Blob([photos[i]], { type: 'application/json' });
      fd.append('photos', blob, photos[i].name);
    }

    fd.append('catalogs', JSON.stringify(catalogs));
    return this.http.post(this.resourceUrl, fd);
  }

  update(catalogs: ICatalogs): Observable<EntityResponseType> {
    return this.http.put<ICatalogs>(this.resourceUrl, catalogs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatalogs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatalogs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
