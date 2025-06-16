import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly productService = inject(ProductService);

  count = this.productService.count;
  loading = this.productService.loading;

  constructor() {
    this.productService.setLoading(true);

    setTimeout(() => {
      this.productService.setAll([
        {
          id: 'p1',
          title: 'Demo Product',
          price: 99,
          imageUrl: '',
        },
      ]);

      this.productService.setLoading(false);
    }, 1000);
  }
}
