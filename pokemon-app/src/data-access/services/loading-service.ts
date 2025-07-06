import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requestCount = signal(0);
  public readonly isLoading = computed(() => this.requestCount() > 0);

  constructor() {
  }

  increment() {
    this.requestCount.set(this.requestCount() + 1);
  }

  decrement() {
    this.requestCount.set(this.requestCount() - 1);
  }
}
