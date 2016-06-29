import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
// import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {App} from './app/containers/app/app';

import {APP_ROUTER_PROVIDER} from "./app/routes";

import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { trapReducer } from "./app/trap.reducer";
import { TrapEffects } from "./app/trap.effects";
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';



// enableProdMode()
bootstrap(App, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDER,
  GOOGLE_MAPS_PROVIDERS,
  provideStore({ traps: trapReducer }),
  runEffects(TrapEffects),
  { provide: LocationStrategy, useClass: HashLocationStrategy },
])
.catch(err => console.error(err));
