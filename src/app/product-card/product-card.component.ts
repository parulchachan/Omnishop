import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  inStock:boolean;

  constructor(private cartService: ShoppingCartService) {
    //console.log('stock:'+this.product.stock);
    // if(this.shoppingCart.getQuantity(this.product)<this.product.stock){
    //   this.inStock=true;
    // }
   }

  addToCart(){
    if(this.shoppingCart.getQuantity(this.product)<this.product.stock)
      this.cartService.addToCart(this.product);
    else{
      this.inStock=false;
    }
  }

}
