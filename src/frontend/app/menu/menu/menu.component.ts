import {Component, OnInit} from '@angular/core';
import {
  faComments,
  faExchangeAlt,
  faHourglassEnd, faNewspaper,
  faRobot,
  faServer,
  faSlidersH,
  faUsers, faWallet
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  icons = {
    users: faUsers,
    comments: faComments,
    sliders: faSlidersH,
    server: faServer,
    newspaper: faNewspaper,
    hourglass: faHourglassEnd,
    wallet: faWallet,
    exchange: faExchangeAlt,
  };

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray([], event.previousIndex, event.currentIndex);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
