import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from "../../shared/dish";
import { DishProvider } from "../../providers/dish/dish";
import { FavoriteProvider } from "../../providers/favorite/favorite";
import { DishdetailPage } from "../dishdetail/dishdetail";
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  
  dishes: Dish[];
  errMsg: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private dishService:DishProvider,
  private favoriteService:FavoriteProvider,
  private toastController:ToastController,
  @Inject ('BaseURL') private BaseURL ) {
  


  }

  ngOnInit(): void {
    this.dishService.getDishs()
      .subscribe(dishes => this.dishes = dishes,
        errMsg => this.errMsg = errMsg);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event , dish):void{
    this.navCtrl.push(DishdetailPage,{
      dish: dish
    });
  }
  addToFavorite(dish:Dish){
    console.log(`Adding to favorite from Menu: ${dish.id}`)
   this.favoriteService.addFavorite(dish.id);
   this.toastController.create({
    message:`Dish ${dish.name} added to favorites successfully`,
    duration:3000
  }).present();
  }
}
