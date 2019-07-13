import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPartsImages } from 'app/shared/model/parts-images.model';

type EntityResponseType = HttpResponse<IPartsImages>;
type EntityArrayResponseType = HttpResponse<IPartsImages[]>;

@Injectable({ providedIn: 'root' })
export class PartsImagesService {
  public resourceUrl = SERVER_API_URL + 'api/parts-images';

  constructor(protected http: HttpClient) {}

  create(partsImages: IPartsImages): Observable<EntityResponseType> {
    return this.http.post<IPartsImages>(this.resourceUrl, partsImages, { observe: 'response' });
  }

  update(partsImages: IPartsImages): Observable<EntityResponseType> {
    return this.http.put<IPartsImages>(this.resourceUrl, partsImages, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPartsImages>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartsImages[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
