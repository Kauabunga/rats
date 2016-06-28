import '../pestRxJs';

import { Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StateUpdates, Effect } from '@ngrx/effects';
import * as _ from 'lodash';
import {
  INIT_TRAP, FETCH_TRAPS, UPDATE_TRAP, NEW_TRAP, NEW_TRAP_SUCCESS, NEW_TRAP_FAILED, DELETE_TRAP,
  DELETE_TRAP_SUCCESS, DELETE_TRAP_FAILED, FETCH_TRAPS_FAILED, UPDATE_TRAP_SUCCESS, UPDATE_TRAP_FAILED
} from "./trap.reducer";


@Injectable()
export class TrapEffects {
  constructor(private http: Http, private updates$: StateUpdates<any>) { }

  @Effect() delete$ = this.updates$
    .whenAction(DELETE_TRAP)
    .map(update => update.action.payload.id)
    .mergeMap(id => this.http.delete(`https://reactrats.firebaseio.com/traps/${id}.json`)
      .map(res => console.log(res) && res.json())
      .map(() => ({ type: DELETE_TRAP_SUCCESS, payload: {id} }))
      .catch(() => Observable.of({ type: DELETE_TRAP_FAILED, payload: {id} }))
    );


  @Effect() update$ = this.updates$
    .whenAction(UPDATE_TRAP)
    .map(state => state.action.payload)
    .buffer(this.updates$.whenAction(UPDATE_TRAP).debounceTime(4000))
    .switchMap(traps => Observable.from(traps.reverse()))
    .distinctUntilKeyChanged('id')
    .mergeMap(trap => this.http.put(`https://reactrats.firebaseio.com/traps/${trap.id}.json`, JSON.stringify(_.omit(trap, 'id')))
      .map(res => res.json())
      .map(trap => ({ type: UPDATE_TRAP_SUCCESS, payload: trap }))
      .catch(() => Observable.of({ type: UPDATE_TRAP_FAILED }))
    );

  @Effect() new$ = this.updates$
    .whenAction(NEW_TRAP)
    .map(state => state.action.payload)
    .mergeMap(trap => this.http.put(`https://reactrats.firebaseio.com/traps/${trap.id}.json`, JSON.stringify(_.omit(trap, 'id')))
      .map(res => res.json())
      .map(trap => ({ type: NEW_TRAP_SUCCESS, payload: trap }))
      .catch(() => Observable.of({ type: NEW_TRAP_FAILED }))
    );


  getTrapsAsArray(trapMap){
    return Object.keys(trapMap).map((key, index) => {
      return (<any>Object).assign(trapMap[key], {id: key});
    });
  }

}



