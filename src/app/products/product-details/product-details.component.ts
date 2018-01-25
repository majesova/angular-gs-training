import { Component, OnInit } from '@angular/core';
import {IProduct} from '../product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../product.service';


@Component({
  selector: 'pm-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
	pageTitle :string = 'Product Detail';
	product:IProduct;
	errorMessage:string='';

  constructor(private _route: ActivatedRoute,  
  	private _router: Router, 
  	private _productService: ProductService) {

   }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

}
