import { httpResource } from '@angular/common/http';
import { Injectable, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly resource = httpResource<Product[]>(
    () => 'https://fakestoreapi.com/products'
  );

  readonly products = this.resource.value;
  readonly isLoading = this.resource.isLoading;
  readonly error = this.resource.error;
  readonly count = computed(() => this.products()?.length ?? 0);

  constructor() {
    effect(() => {
      const err = this.error();
      if (err) {
        console.error('Product load failed:', err);
      }
    });
  }
}
