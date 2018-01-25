import { Component, OnInit } from '@angular/core';
import {IProduct} from '../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	pageTitle: string = "Product List from component";
	imageWidth: number=50;
	imageMargin: number=2;
	showImages: boolean = false;
	_listFilter: string;
	errorMessage: string;
	get listFilter():string{
		return this._listFilter;
	}
	set listFilter(value:string){
		this._listFilter = value;
		this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;

	};
	filteredProducts: IProduct[];

	performFilter(filterBy:string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product:IProduct)=> product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}

  products:IProduct[] = [];
    
	
  constructor(private _productService: ProductService) { 
  	//this.listFilter = 'cart';
  }

  ngOnInit() {
  	console.log("ngOnInit");
  	this._productService.getProducts().subscribe(
  		products=> {this.products = products; 
  			this.filteredProducts = this.products},
  		error => this.errorMessage= <any>error);
  	this.filteredProducts  = this.products;
  }

  toggleImages():void {
  	this.showImages = !this.showImages;
  }

  onRatingClicked(message:string){
  	this.pageTitle = 'Product List, '+ message;
  }

}
