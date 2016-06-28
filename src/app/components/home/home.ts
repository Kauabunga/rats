import {Component} from '@angular/core';

import { INCREMENT, DECREMENT, RESET } from '../../counter';
import { NEW_TRAP, DELETE_TRAP, UPDATE_TRAP } from '../../trap.reducer';
import { Store } from '@ngrx/store';

import {Observable} from "rxjs/Observable";
import {Trap} from "../../trap.interface";

interface AppState {
  counter: number;
  traps: Trap[];
}


@Component({
  selector: 'home',
  pipes: [],
  providers: [],
  directives: [],
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {

  traps: Observable<any>;
  counter: Observable<any>;

  constructor(public store: Store<AppState>) {
    this.counter = store.select('counter');
    this.traps = store.select('traps');

    console.log('this.traps', this.traps);
  }

  ngOnInit() {

  }

  newTrap(){
    this.store.dispatch({ type: NEW_TRAP });
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }


}
