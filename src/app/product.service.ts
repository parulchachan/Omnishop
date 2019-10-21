import { element } from 'protractor';
import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Product } from './models/product';


 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase){ }

  create(product){
   return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  getProduct(productId):AngularFireObject<Product>{
    console.log(productId);
    return this.db.object('/products/'+ productId);
  }

  update(productId,product){
    return this.db.object('/products/'+ productId).update(product);
  }

  getStock(productId):number{
   let ref= this.db.database.ref('/products/');
   var result:number;
   ref.on('value', function getData(data){
     var products=data.val();
      result= products[productId].stock;
      return result;
   })
   return result
  }

  delete(productId){
    return this.db.object('/products/'+ productId).remove();
  }

  updateStock(productId,data){
    this.db.object('/products/'+ productId + '/stock').set(data);
  }

  uploadPhoto(file,metaData){
    const storageRef: firebase.storage.Reference= firebase.storage().ref('/photos/products/').child(file.name);
    var task= storageRef.put(file,metaData);
    task.on("state_changed",(snapshot) =>  {
      var percentage= (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(percentage==100){
      storageRef.getDownloadURL().then((url: string)=>{
        console.log(url);
        return url;
        });
      } 
      else{
        return 'abc';
      }
    }); 
  }

}
