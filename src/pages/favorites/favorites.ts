import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ItemSliding,ToastController,LoadingController,AlertController } from 'ionic-angular';
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
    private toastController:ToastController,
    private loadingController:LoadingController,
    private alertController:AlertController,
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
    const alert = this.alertController.create({
      title:'Confirm Delete',
      message:`Do you want to delete favorite ${id} ?`,
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          handler:()=>{
            console.log('cancel deleting')
          }
          
        },
        {
          text:'Delete',
          handler:()=>{
            const toast =this.toastController.create({
              message:`Dish ${id} deleted successfully`,
              duration: 3000
            });
            const loading = this.loadingController.create({
              content:'Deleting . . .'
            });
            loading.present();
            this.favoriteService.deleteFavorite(id)
            .subscribe(dishes => {this.favorites = dishes; loading.dismiss(); toast.present()}  ,
            errMsg => {this.errMsg = errMsg; loading.dismiss()});
          }
        }
      ]
    });

    
    alert.present();
    
    item.close();
  }
}
