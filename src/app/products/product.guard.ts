import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductGuard implements CanActivate {

constructor(private _router:Router){

}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	let id = +next.url[1].path;
  	if(isNaN(id) || id < 1) {
  		console.log("invalid id of product: "+ id);
  			this._router.navigate(['/products'])
  	}
    return true;
  }
}
