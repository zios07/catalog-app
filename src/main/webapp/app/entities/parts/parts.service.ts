import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { AuthServerProvider } from 'app/core';
import { createRequestOption } from 'app/shared';
import { IParts } from 'app/shared/model/parts.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IParts>;
type EntityArrayResponseType = HttpResponse<IParts[]>;

@Injectable({ providedIn: 'root' })
export class PartsService {
  public resourceUrl = SERVER_API_URL + 'api/parts';

  constructor(protected http: HttpClient, private authService: AuthServerProvider) {}

  create(parts: IParts, image, technicalManual): Observable<EntityResponseType> {
    const fd = new FormData();

    const blob = new Blob([image], { type: 'application/json' });
    fd.append('image', blob, image.name);

    const blob2 = new Blob([technicalManual], { type: 'application/json' });
    fd.append('technicalManual', blob2, technicalManual.name);

    fd.append('parts', JSON.stringify(parts));
    return this.http.post<IParts>(this.resourceUrl, fd, { observe: 'response' });
  }

  update(parts: IParts): Observable<EntityResponseType> {
    return this.http.put<IParts>(this.resourceUrl, parts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  downloadTechnicalManual(manual) {
    window.location.href = this.resourceUrl + '/download/manual/' + manual.id + '?access_token=' + this.authService.getToken();
  }
}
