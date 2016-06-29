import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {AppState} from "../app/app";
import {TrapService} from "../../trap.service";
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';


@Component({
  selector: 'map-page',
  pipes: [],
  providers: [],
  directives: [GOOGLE_MAPS_DIRECTIVES],
  styleUrls: ['./mapPage.less'],
  templateUrl: './mapPage.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPage {

  traps: Observable<any>;

  //TODO move into state
  lat: number = -41.2439056;
  lng: number = 174.7918818;
  zoom: number = 15;

  constructor(public store: Store<AppState>, private trapService: TrapService) {
    this.traps = store.select('traps');
  }

  ngOnInit() {}

}
