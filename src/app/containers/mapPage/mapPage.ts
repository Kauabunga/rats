import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {AppState} from "../app/app";
import {TrapService} from "../../trap.service";
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import {Trap} from "../../trap.interface";


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
  // zoom: number = 1;

  disableDefaultUI: boolean = true;
  streetViewControl: boolean = false;
  disableDoubleClickZoom: boolean = true;

  constructor(private store: Store<AppState>, private trapService: TrapService) { }

  ngOnInit() {
    this.traps = this.store.select('traps');
  }
  
  ngOnDestroy(){}

  mapClick($event){
    console.log('mapClick', $event.coords);

    let newTrap = (<any>Object).assign(this.trapService.getNewTrap(),
        { position: $event.coords, meta: { isOpen: true } });

    console.log('newTrap', newTrap);

    this.trapService.createTrap(newTrap);
  }

  infoWindowClose(trap){

    console.log('infoWindowClose', trap);

    trap.meta = trap.meta || {};
    trap.meta.isOpen = false;

    this.trapService.updateTrap(trap);
  }

  onTrapUpdate(trap){
    console.log('onTrapUpdate', trap)
    this.trapService.updateTrap(trap);
  }

  markerClick(trap){
    console.log('markerClick', trap);
  }

  mapDblClick($event){
    console.log('mapDblClick', $event);
  }

  centerChange($event){
    console.log('centerChange', $event);
  }

  boundsChange($event){
    console.log('boundsChange', $event);
  }

  trapHasPosition(trap: Trap){
    return this.getTrapLat(trap) && this.getTrapLng(trap);
  }
  
  getTrapLat(trap: Trap = {} as Trap){
    return trap.position && parseFloat(trap.position.lat);
  }

  getTrapLng(trap: Trap = {} as Trap){
    return trap.position && parseFloat(trap.position.lng);
  }

}
