import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  public sort:string;
  public games:Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;

  constructor(
    private httpService:HttpService,
    private activateRoute: ActivatedRoute,
    private router:Router){ }

  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe((params: Params)=>{
      if(params['game-search']){
        this.searchGame('metacrit', params['game-search']);
      } else {
        this.searchGame('metacrit');
      }
    })
  }

  searchGame(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGameList(sort, search)
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results
      console.log(gameList);
      
    })
  }
  openGameDetails(id: string):void{
    this.router.navigate(['details',id]);
  }

  ngOnDestroy():void {
    if(this.routeSub){
      this.gameSub.unsubscribe
    }
    if(this.gameSub){
      this.gameSub.unsubscribe;
    }
  }

}
