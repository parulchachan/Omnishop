import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  
  products=[];
  filteredProducts=[];
  category;
  cart;
  Subscription;

  constructor(route: ActivatedRoute,productService: ProductService, 
    private shoppingCartService:ShoppingCartService,
    private spinner: NgxSpinnerService){ 

    spinner.show();
    
    productService.getAll().snapshotChanges()
    .switchMap(list=>{
        this.products=list.map(item=>{
          return{ key: item.key,
            ...item.payload.val()};
        });
      return route.queryParamMap
    }).subscribe(params=>{
        this.category=params.get('category');
        this.filteredProducts=(this.category) ?
        this.products.filter(p=> p.category===this.category) :this.products;
    });
  }
  async ngOnInit() {
    this.Subscription=(await this.shoppingCartService.getCart()).valueChanges().subscribe(cart=>{
      this.cart=new ShoppingCart(cart.items);
      this.spinner.hide();
    });
  }

  ngOnDestroy(){
    this.Subscription.unsubscribe();
  }

}

    // .switchMap(products=> {
    //   this.products=products;
    //   return route.queryParamMap
    // })
    // .subscribe(params=>{
    //   this.category=params.get('category');
    //   this.filteredProducts=(this.category) ?
    //     this.products.filter(p=> p.category===this.category) :this.products;
