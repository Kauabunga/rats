import { provideRouter, RouterConfig } from '@angular/router';
import {TrapPage} from "./containers/trapPage/trapPage";
import {MapPage} from "./containers/mapPage/mapPage";

export const appRoutes: RouterConfig = [


  { path: '',           component: MapPage,       },
  { path: 'trap',       component: TrapPage,       },


  { path: '**', redirectTo: '/', terminal: true }

];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
