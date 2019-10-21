import {  Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Shipping } from '../models/shipping';
import { OrderService } from '../order.service';
import 'rxjs/add/operator/map'
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping:Shipping={
    name:"",
    addressLine1:"",
    addressLine2: "",
    city: "",
    mobile:null
  };
  cart: ShoppingCart; 
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId;

  constructor(
    private router:Router,
    private authService: AuthService,
    private shoppingCartService : ShoppingCartService, 
    private orderService: OrderService ){

  }

  async ngOnInit(){
   let cart$= (await this.shoppingCartService.getCart()).valueChanges();
   this.cartSubscription= cart$.subscribe(x=> this.cart=new ShoppingCart(x.items));
   this.userSubscription=this.authService.user$.subscribe(user=> this.userId=user.uid)
  }
  
  async placeOrder() {
    let order=new Order(this.userId,this.shipping,this.cart);
    let result=await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }  
  
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
