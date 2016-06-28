import { ActionReducer, Action } from '@ngrx/store';
import { Trap } from "./trap.interface";

export const INIT_TRAP = 'INIT_TRAP';
export const FETCH_TRAPS = 'FETCH_TRAPS';
export const FETCH_TRAPS_FAILED = 'FETCH_TRAPS_FAILED';

export const ADD_TRAP = 'ADD_TRAP';

export const NEW_TRAP_FIREBASE = 'NEW_TRAP_FIREBASE';
export const NEW_TRAP = 'NEW_TRAP';
export const NEW_TRAP_SUCCESS = 'NEW_TRAP_SUCCESS';
export const NEW_TRAP_FAILED = 'NEW_TRAP_FAILED';

export const DELETE_TRAP_FIREBASE = 'DELETE_TRAP_FIREBASE';
export const DELETE_TRAP = 'DELETE_TRAP';
export const DELETE_TRAP_SUCCESS = 'DELETE_TRAP_SUCCESS';
export const DELETE_TRAP_FAILED = 'DELETE_TRAP_FAILED';

export const UPDATE_TRAP_FIREBASE = 'UPDATE_TRAP_FIREBASE';
export const UPDATE_TRAP = 'UPDATE_TRAP';
export const UPDATE_TRAP_SUCCESS = 'UPDATE_TRAP_SUCCESS';
export const UPDATE_TRAP_FAILED = 'UPDATE_TRAP_FAILED';

export const trapReducer: ActionReducer<Trap[]> = (state: Trap[] = [], action: Action) => {
  switch (action.type) {

    case FETCH_TRAPS_FAILED:
      console.log('FETCH_TRAPS_FAILED');
      return state;

    case FETCH_TRAPS:
      //TODO if there is a current state then safely merge
      console.log('FETCH_TRAPS', action.payload);
      return [
        // ...state,
        ...action.payload
      ];

    case NEW_TRAP_FIREBASE:
    case NEW_TRAP:
      console.log('NEW_TRAP', action.payload);
      if((<any>state).find(trap => trap.id === action.payload.id)){
        return state;
      }
      return [
        ...state,
        action.payload
      ];

    case NEW_TRAP_SUCCESS:
      return state;

    case ADD_TRAP:
      return [
        ...state,
        action.payload
      ];

    case DELETE_TRAP:
      console.log('DELETE_TRAP', action);
      let deletingTrap = (<any>state).find(trap => trap.id === action.payload.id);
      (<any>Object).assign(deletingTrap, {meta: {deleting: true}});
      return state;

    case DELETE_TRAP_FIREBASE:
    case DELETE_TRAP_SUCCESS:
      console.log('DELETE_TRAP_SUCCESS', action);
      return state.filter(trap => trap.id !== action.payload.id);

    case DELETE_TRAP_FAILED:
      console.log('DELETE_TRAP_FAILED', action);
      let deleteFailed = (<any>state).find(trap => trap.id === action.payload.id);
      (<any>Object).assign(deleteFailed, {meta: {deleting: false, deleteError: 'ERROR'}});
      return state;


    case UPDATE_TRAP_FIREBASE:
    case UPDATE_TRAP:
      let updatedTrap = (<any>state).find(trap => trap.id === action.payload.id);
      console.log('UPDATE_TRAP', updatedTrap, action);
      (<any>Object).assign(updatedTrap, action.payload);
      return state;

    case INIT_TRAP:
      console.log('INIT_TRAP');
      return state;

    default:
      return state;
  }
};
