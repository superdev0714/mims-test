import { createReducer, on } from '@ngrx/store';
import * as NewsAction from '../actions';
import { NewsState } from '../datatypes';

export const initialState: NewsState = {
  inProgress: false,
  errorMessage: '',
  search: '',
  news: [],
  metaData: {
    found: 0,
    returned: 0,
    limit: 0,
    page: 0
  },
};


export const reducer = createReducer(
  initialState,

  // Fetch News
  on(NewsAction.fetchTopStories, (state, payload) => {
    const { search, metaData } = state;
    if (search === payload.query.search) {
      return {
        ...state,
        inProgress: true,
        errorMessage: '',
        search: payload.query.search,
        metaData: {
          ...metaData,
          found: 0,
          returned: 0,
          limit: 0,
        }
      }
    } else {
      return {
        ...state,
        inProgress: true,
        errorMessage: '',
        search: payload.query.search,
        news: [],
        metaData: {
          found: 0,
          returned: 0,
          limit: 0,
          page: 1
        }
      }
    }
  }),

  // Fetch News Success
  on(NewsAction.fetchTopStoriesSuccess, (state, payload) => {
    const { news } = state;
    const updatedNews = [...news, ...payload.data];
    return {
      ...state,
      inProgress: false,
      errorMessage: '',
      news: updatedNews,
      metaData: payload.meta
    }
  }),

  // Fetch News Failure
  on(NewsAction.fetchTopStoriesFailure, state => ({
    ...state,
    inProgress: false,
    errorMessage: 'Failed to fetch News',
    news: [],
    metaData: {
      found: 0,
      returned: 0,
      limit: 0,
      page: 0
    }
  }))
);
