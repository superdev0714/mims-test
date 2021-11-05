import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetaData } from '../models/meta.model';
import { News } from '../models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  fetchTopStories(query: any) {
    let paramsStr = '';
    if (query) {
      paramsStr = Object.keys(query).reduce((prev, item) => {
        return prev += `&${item}=${query[item]}`;
      }, '');
    }
    const fetchQuery = `top?api_token=${environment.token}${paramsStr}`
    return this.http.get<{ meta: MetaData, data: News[] }>(`${environment.baseUrl}${fetchQuery}`);
  }
  
}
