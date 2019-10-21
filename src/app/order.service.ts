import { ProductService } from './product.service';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
}) 
export class OrderService {

  constructor(private db: AngularFireDatabase,private shoppingCartService: ShoppingCartService,
     private productService :ProductService) {
  }

  getOrder(){
    return this.db.list('/orders');
  }

  getOrderById(Id){
    return this.db.object('/orders/'+Id)
  }

   async getOrderByUser(userId:string){
    console.log("userId"+userId);
    let result:AngularFireList<Order>=await this.db.list('/orders',ref => ref.orderByChild('userId')
      .equalTo(userId.toString()));
    return result;
  }

  async placeOrder(order: Order){
    let item;
    for(item in order.items){
      let prev =await this.productService.getStock(order.items[item].product.id);
      let newStock=prev-order.items[item].quantity
      this.productService.updateStock(order.items[item].product.id,newStock);
    }
    let result= await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
