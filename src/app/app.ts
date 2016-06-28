import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {Trap} from "./trap.interface";
import {TrapService} from "./trap.service";


export interface AppState {
  traps: Trap[]
}

@Component({
  selector: 'app',
  pipes: [],
  providers: [ TrapService ],
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: './app.html',
})
export class App {

  constructor(private trapService: TrapService) { }

  ngOnInit() {
    this.trapService.init();
  }

}
