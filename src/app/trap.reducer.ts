import { ActionReducer, Action } from '@ngrx/store';
import { Trap } from "./trap.interface";


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

  console.log(action.type, action.payload);

  switch (action.type) {

    case NEW_TRAP_FIREBASE:
    case NEW_TRAP:
      if((<any>state).find(trap => trap.id === action.payload.id)){
        return state;
      }

      action.payload.position = action.payload.position || {};
      action.payload.meta = action.payload.meta || {};

      return [
        ...state,
        action.payload
      ];

    case NEW_TRAP_SUCCESS:
      return state;

    case DELETE_TRAP:
      let deletingTrap = (<any>state).find(trap => trap.id === action.payload.id);
      (<any>Object).assign(deletingTrap, {meta: {deleting: true}});
      return state;

    case DELETE_TRAP_FIREBASE:
    case DELETE_TRAP_SUCCESS:
      return state.filter(trap => trap.id !== action.payload.id);

    case DELETE_TRAP_FAILED:
      let deleteFailed = (<any>state).find(trap => trap.id === action.payload.id);
      (<any>Object).assign(deleteFailed, {meta: {deleting: false, deleteError: 'ERROR'}});
      return state;


    case UPDATE_TRAP_FIREBASE:
    case UPDATE_TRAP:
      let updatedTrap = (<any>state).find(trap => trap.id === action.payload.id);
      (<any>Object).assign(updatedTrap, action.payload);
      return state;

    default:
      return state;
  }
};
