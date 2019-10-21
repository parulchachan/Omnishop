import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  shoppingCartItemCount: number;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
     
  }

  logout(){
    this.auth.logout();
    location.reload();
  }

  toggle(){
    $(".navbar-toggler").click();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=> this.appUser= appUser )
    let cart$= await  this.shoppingCartService.getCart() 
    cart$.valueChanges().subscribe(cart=> {
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items)
        this.shoppingCartItemCount+=cart.items[productId].quantity
    });
  }

}
