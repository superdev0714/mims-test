import { MetaData } from './models';
import { News } from './models/news.model';
export interface BaseState {
    inProgress: boolean;
    errorMessage: string;
}

export interface NewsState extends BaseState {
    news: News[];
    metaData: MetaData;
    search: string;
}

export interface AppState {
    news: NewsState;
}
