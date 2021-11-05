import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AppState } from '../datatypes';
import * as news from './news.reducer';

export const reducers: ActionReducerMap<AppState> = {
  news: news.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
