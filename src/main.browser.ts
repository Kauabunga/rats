import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
// import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {App} from './app/app';

import {APP_ROUTER_PROVIDER} from "./app/routes";

import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { counterReducer } from "./app/counter";
import { trapReducer } from "./app/trap.reducer";
import { TrapEffects } from "./app/trap.effects";



// enableProdMode()

bootstrap(App, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDER,
  provideStore({ counter: counterReducer, traps: trapReducer}),
  runEffects(TrapEffects),
  { provide: LocationStrategy, useClass: HashLocationStrategy },
])
.catch(err => console.error(err));
