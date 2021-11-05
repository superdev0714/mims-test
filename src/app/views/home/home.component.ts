import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fetchTopStories } from 'src/app/store/actions';
import { AppState, NewsState } from 'src/app/store/datatypes';
import { News } from 'src/app/store/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  newsList$: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);

  private page = 1;

  private search = '';

  private destroy$ = new Subject();

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    /**
     * Get news state
     */
    this.store
    .select((state) => state.news)
    .pipe(takeUntil(this.destroy$))
    .subscribe((newsState: NewsState) => {
      this.newsList$.next(newsState.news);
      this.page = newsState.metaData.page;
      this.search = newsState.search;
    });
    
    this.fetchNews();
  }

  onScroll() {
    console.log('scrolled!!');
    this.page += 1;
    this.fetchNews();
  }

  private fetchNews() {
    // Distpach Action for Top Stories within science category
    this.store.dispatch(fetchTopStories({
      query: {
          categories: 'science',
          page: this.page,
          search: this.search
      }
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
