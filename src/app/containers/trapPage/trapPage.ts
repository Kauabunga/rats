import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {TrapService} from "../../trap.service";
import {TrapForm} from "../../components/trapForm/trapForm";
import {AppState} from "../app/app";
import {Trap} from "../../trap.interface";


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
  subscription;

  constructor(private store: Store<AppState>, private trapService: TrapService) { }

  ngOnInit() {
    this.traps = this.store.select('traps');
  }

  ngOnDestroy() {

  }

  onTrapChange(trap){
    this.trapService.updateTrap(trap);
  }

  newTrap(){
    this.trapService.createTrap(<Trap>undefined);
  }

  deleteTrap(id){
    this.trapService.deleteTrap(id);
  }

}
