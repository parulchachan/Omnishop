import { ProductService } from './product.service';
import { CategoryService } from './category.service';

import { AuthService } from './auth.service';
import { AdminAuthGaurdService } from './admin-auth-gaurd.service';
import { UserService } from './user.service';
import { AuthGaurdService } from './auth-gaurd.service';
import {ShoppingCartService} from './shopping-cart.service'
import { OrderService } from './order.service'



import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { CustomFormsModule } from 'ng2-validation';
import { NgxSpinnerModule } from "ngx-spinner";

import{ AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

import {FlexLayoutModule} from '@angular/flex-layout'
import {MatButtonModule, MatIconModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,
  MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'           //importing for mat-sort
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyOrderDetailsComponent } from './my-order-details/my-order-details.component';


const appRoutes: Routes = [ 
  {
  path:'',
  component: ProductsComponent
  },
  {
    path:'products',
    component: ProductsComponent
  },
  {
    path:'products/:id',
    component: ProductDetailsComponent
  },
  {
    path:'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path:'login',
    component: LoginComponent
  },


  {
    path:'check-out',
    component: CheckOutComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path:'order-success/:id',
    component: OrderSuccessComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path:'my/orders',
    component: MyOrdersComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path:'my/orders/:id',
    component: MyOrderDetailsComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path:'admin/products/new',
    component: ProductFormComponent,
    canActivate:[AuthGaurdService,AdminAuthGaurdService]
  },
  {
    path:'admin/products/:id',
    component: ProductFormComponent,
    canActivate:[AuthGaurdService,AdminAuthGaurdService]
  },
  {
    path:'admin/products',
    component: AdminProductsComponent,
    canActivate:[AuthGaurdService,AdminAuthGaurdService]
  },
  {
    path:'admin/orders',
    component: AdminOrdersComponent,
    canActivate:[AuthGaurdService,AdminAuthGaurdService]
  },
  {
    path:'**',
    redirectTo:'',
    component:ProductsComponent
  }

 ];




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ProductDetailsComponent,
    MyOrderDetailsComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    NgbModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],

  exports: [
    RouterModule
  ],

  providers: [
    AuthService,
    AuthGaurdService,
    AdminAuthGaurdService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],

  bootstrap: [AppComponent]
})


export class AppModule { 
  
}
