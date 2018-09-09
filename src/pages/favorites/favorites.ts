import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ItemSliding } from 'ionic-angular';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Dish } from "../../shared/dish";
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  
  favorites: Dish[];
  errMsg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    @Inject ('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.favoriteService.getFavorites()
    .subscribe(dishes => this.favorites=dishes , 
    errMsg => this.errMsg = errMsg);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deletFavoriteItem(item:ItemSliding , id: number):void{

    this.favoriteService.deleteFavorite(id)
    .subscribe(dishes => this.favorites = dishes,
    errMsg => this.errMsg = errMsg);

    
    item.close();
  }
}
