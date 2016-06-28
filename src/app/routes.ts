import { provideRouter, RouterConfig } from '@angular/router';
import {Home} from "./components/home/home";
import {About} from "./components/about/about";
import {TrapPage} from "./containers/trapPage/trapPage";

export const appRoutes: RouterConfig = [


  { path: '',           component: Home,       },
  { path: 'trap',       component: TrapPage,       },
  { path: 'about',      component: About,      },

  { path: '**', redirectTo: '/', terminal: true }

];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
