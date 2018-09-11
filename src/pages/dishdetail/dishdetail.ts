import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Dish } from "../../shared/dish";
// import { Comment } from "../../shared/comment";
import { FavoriteProvider } from "../../providers/favorite/favorite";
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMsg:string;
  avgstars:string;
  numberOfComments:number;
  isFavorite:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private favoriteService: FavoriteProvider,
  private toastController:ToastController,
  @Inject ('BaseURL') private BaseURL) {

    this.dish = navParams.get('dish');
    this.numberOfComments = this.dish.comments.length;
    let total= 0;
    this.dish.comments.forEach(comment => total += comment.rating)
    this.avgstars = (total/ this.numberOfComments).toFixed(2);
    this.isFavorite = favoriteService.isFavorite(this.dish.id);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorite(){
    console.log(`Adding to favorite: ${this.dish.id}`)
    this.isFavorite= this.favoriteService.addFavorite(this.dish.id);
    this.toastController.create({
      message:`Dish ${this.dish.name} added to favorites successfully`,
      duration:3000,
      position:'middle'
    }).present();
  }
}
