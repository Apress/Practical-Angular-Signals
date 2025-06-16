import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal(false);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly count = computed(() => this._products().length);

  setAll(items: Product[]) {
    this._products.set(items);
  }

  setLoading(isLoading: boolean) {
    this._loading.set(isLoading);
  }
}
