import { createAction, props } from '@ngrx/store';
import { News, MetaData } from '../models';

export const fetchTopStories = createAction(
  '[News] Fetch Top Stories',
  props<{ query: any }>()
);

export const fetchTopStoriesSuccess = createAction(
  '[News] Fetch Top Stories Success',
  props<{ meta: MetaData, data: News[] }>()
);

export const fetchTopStoriesFailure = createAction(
  '[News] Fetch Top Stories Failure',
  props<{ error: any }>()
);
