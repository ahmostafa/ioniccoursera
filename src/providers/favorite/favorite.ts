import { DishProvider } from './../dish/dish';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from "../../shared/dish";
import "rxjs/operator/map";
import { Observable } from "rxjs/Observable";
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites:Array<any>
  constructor(public http: Http,
  private dishService:DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites=[];
  }

  addFavorite(id: number):boolean{
    if(!this.isFavorite(id))
      this.favorites.push(id);
    return true;
  }

  isFavorite(id: number):boolean{
    return this.favorites.some(el=> el === id);
  }

  getFavorites():Observable<Dish[]>{
    return this.dishService.getDishs()
    .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id:number):Observable<Dish[]>{
    if(this.isFavorite(id)){
        const index = this.favorites.indexOf(id);
        this.favorites.splice(index,1);
        return this.getFavorites();
      }
      else{// Throw Exception
        console.log(`Deleting non-existant Favorite: ${id}`);
        return Observable.throw(`Deleting non-existant Favorite: ${id}`);
      }
  }

}
