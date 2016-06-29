import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { UUID } from 'angular2-uuid';
import {Trap} from "./trap.interface";
import { Store } from '@ngrx/store';
import {
    NEW_TRAP, DELETE_TRAP, UPDATE_TRAP, DELETE_TRAP_FIREBASE,
    NEW_TRAP_FIREBASE, UPDATE_TRAP_FIREBASE
} from "./trap.reducer";


import * as _ from 'lodash';
import * as firebase from 'firebase';
import {AppState} from "./containers/app/app";


@Injectable()
export class TrapService {

  firebase;

  constructor(public store: Store<AppState>) { }

  init(){

    this.firebase = (<any>firebase).initializeApp({
      apiKey: 'AIzaSyAEQ_NBe5XcmQmMaacYMwVF_1dvFDt619c',
      authDomain: "reactrats.firebaseapp.com",
      databaseURL: 'https://reactrats.firebaseio.com',
      storageBucket: "reactrats.appspot.com",
    });

    //TODO unsubscribe on destroy??? Do services have an onDestroy?

    this.firebase.database().ref('traps')
      .on('child_added', trap => {
        console.log('child_added', trap.key, trap.val());
        this.store.dispatch({type: NEW_TRAP_FIREBASE, payload: (<any>Object).assign({id: trap.key}, trap.val())});
      });

    this.firebase.database().ref('traps')
      .on('child_removed', trap => {
        console.log('child_removed', trap.key, trap.val());

        this.store.dispatch({ type: DELETE_TRAP_FIREBASE, payload: { id: trap.key } });
      });

    this.firebase.database().ref('traps')
      .on('child_changed', trap => {
        console.log('child_changed', trap.key, trap.val());
        this.store.dispatch({ type: UPDATE_TRAP_FIREBASE, payload: (<any>Object).assign({id: trap.key}, trap.val()) });
      });

  }

  updateTrap(trap){
    this.store.dispatch({ type: UPDATE_TRAP, payload: trap });
  }

  createTrap(trap: Trap){
    trap = trap || this.getNewTrap();
    this.store.dispatch({type: NEW_TRAP, payload: trap});
  }

  deleteTrap(id){
    this.store.dispatch({ type: DELETE_TRAP, payload: { id } });
  }

  getNewTrap(): Trap {
    return {
      id: UUID.UUID(),
      name: '',
      meta: {}
    };
  }


}
