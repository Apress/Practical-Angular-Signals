import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  private readonly cartService = inject(CartService);
  products = input.required<Product[] | undefined>();

  addToCart(productId: string) {
    const product = this.products()?.find((p) => p.id === productId);
    if (product) {
      this.cartService.addProduct(product);
    }
  }
}
