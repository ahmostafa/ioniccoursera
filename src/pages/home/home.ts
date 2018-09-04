import { Component,OnInit,Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dish } from "../../shared/dish";
import { DishProvider } from './../../providers/dish/dish';
import { Leader } from "../../shared/leader";
import { LeaderProvider } from './../../providers/leader/leader';
import { Promotion } from "../../shared/promotion";
import { PromotionProvider } from './../../providers/promotion/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  

  dish:Dish;
  leader:Leader;
  promotion:Promotion;
  dishErrMsg:string;
  leaderErrMsg:string;
  promotionErrMsg:string;

  constructor(public navCtrl: NavController,
  private dishService: DishProvider,
  private leaderService: LeaderProvider,
  private promotionService: PromotionProvider,
@Inject('BaseURL') private BaseURL) {

  }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
       errorMsg => this.dishErrMsg = <any>errorMsg );

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader=leader,
      errMsg => this.leaderErrMsg = <any> errMsg);

    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errMsg => this.promotionErrMsg=<any>errMsg)
  }

}
