import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as newsAction from '../actions/news.actions';
import { NewsService } from '../services/news.service';

@Injectable()
export class NewsEffects {

  fetchTopStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsAction.fetchTopStories),
      mergeMap(action => {
        return this.newsService.fetchTopStories(action.query).pipe(
          map(response => newsAction.fetchTopStoriesSuccess(response)),
          catchError(error => of(newsAction.fetchTopStoriesFailure(error.error))),
        )
      })
    )
  );

  constructor(private actions$: Actions, private newsService: NewsService) {}

}
