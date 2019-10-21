import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  inStock:boolean;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    if(this.shoppingCart.getQuantity(this.product)<this.product.stock)
      this.cartService.addToCart(this.product);
    else{
     this.inStock=false;
   }
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
