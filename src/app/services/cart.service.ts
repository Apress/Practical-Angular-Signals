import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    )
  );

  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    // Automatically persist cart to localStorage on any cart change
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this._items()));
    });
  }

  addProduct(product: Product) {
    const current = this._items();
    const index = current.findIndex((i) => i.product.id === product.id);
    if (index >= 0) {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      this._items.set(updated);
    } else {
      this._items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeProduct(productId: string) {
    this._items.set(this._items().filter((i) => i.product.id !== productId));
  }

  clear() {
    this._items.set([]);
  }
}
