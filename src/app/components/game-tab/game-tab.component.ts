import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-game-tab',
  templateUrl: './game-tab.component.html',
  styleUrls: ['./game-tab.component.scss']
})
export class GameTabComponent {
  @Input() game: Game;
}
