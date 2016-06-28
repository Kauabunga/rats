import {Component, ChangeDetectionStrategy} from '@angular/core';

import { NEW_TRAP, DELETE_TRAP, UPDATE_TRAP } from '../../trap.reducer';
import { Store } from '@ngrx/store';

import {Observable} from "rxjs/Observable";
import {Trap} from "../../trap.interface";
import {AppState} from "../../app";
import {TrapService} from "../../trap.service";


@Component({
  selector: 'trap-page',
  pipes: [],
  providers: [],
  directives: [],
  styleUrls: ['./trapPage.css'],
  templateUrl: './trapPage.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrapPage {

  traps: Observable<any>;

  constructor(public store: Store<AppState>, private trapService: TrapService) {
    this.traps = store.select('traps');

    console.log('this.traps', this.traps);
  }

  ngOnInit() {

  }

  onTrapChange(trap){
    this.trapService.updateTrap(trap);
  }

  newTrap(){
    this.trapService.createNewTrap();
  }

  deleteTrap(id){
    this.trapService.deleteTrap(id);
  }

}
