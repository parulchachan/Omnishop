import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
  import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import  'rxjs/add/operator/take';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$; 
  product:Product={
    title: "",
    price: 0,
    category: "",
    imageUrl: "",
    material: "",
    seller: "",
    description: "",
    key: "",
    stock:null
  };
  id;
  image;
  constructor(    
    private router : Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {
    
    this.categories$=  categoryService.getCategories().valueChanges();

    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).valueChanges().take(1).subscribe(p => {
      this.product = p;
    });

  }


  save(product){
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products'])
  }

  async upload(event: any){
    const file: File=event.target.files[0];
    const metaData={'contentType': file.type};
    this.image= await this.productService.uploadPhoto(file,metaData);
    console.log('image='+this.image);
    this.product['imageUrl']=this.image;
    }
  

  delete(){
    if( confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products'])
    }
  }

}


