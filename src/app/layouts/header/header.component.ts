import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fetchTopStories } from 'src/app/store/actions';
import { AppState, NewsState } from 'src/app/store/datatypes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  newsInfo$ = new BehaviorSubject<string>('');

  searchForm!: FormGroup;

  private search = '';

  private destroy$ = new Subject();

  constructor(private readonly store: Store<AppState>, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    /**
     * Get news state
     */
    this.store
    .select((state) => state.news)
    .pipe(takeUntil(this.destroy$))
    .subscribe((newsState: NewsState) => {
      this.newsInfo$.next(`
        Found: ${newsState.metaData.found}
      `);
      this.search = newsState.search;
    });

    this.searchForm = this.fb.group({
      search: [null, [Validators.required]],
    });
  }

  onSearch() {
    if (this.searchForm.controls['search'].value === this.search) {
      return;
    }
    this.store.dispatch(fetchTopStories({
      query: {
          categories: 'science',
          page: 1,
          search: this.searchForm.controls['search'].value
      }
    }));
  }

}
