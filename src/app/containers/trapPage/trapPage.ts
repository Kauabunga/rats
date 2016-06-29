import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {TrapService} from "../../trap.service";
import {TrapForm} from "../../components/trapForm/trapForm";
import {AppState} from "../app/app";


@Component({
  selector: 'trap-page',
  pipes: [],
  providers: [],
  directives: [TrapForm],
  styleUrls: ['./trapPage.less'],
  templateUrl: './trapPage.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrapPage {

  traps: Observable<any>;

  constructor(public store: Store<AppState>, private trapService: TrapService) {
    this.traps = store.select('traps');
  }

  ngOnInit() {}

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
