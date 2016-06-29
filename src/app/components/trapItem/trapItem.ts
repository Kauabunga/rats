import {Component, Input, Output, EventEmitter, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import {TrapService} from "../../trap.service";


@Component({
  selector: 'trap-item',
  pipes: [],
  providers: [],
  directives: [],
  styleUrls: ['./trapItem.less'],
  templateUrl: './trapItem.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrapItem implements AfterViewChecked {

  @Input() trap: any;
  @Output() changed = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(private trapService: TrapService) {}

  ngOnInit() {}

  ngAfterViewChecked(){
    console.log('trapItem After view checked')
  }

  onTrapChange(trap){
    this.trapService.updateTrap(trap);
  }

  deleteTrap(id){
    this.trapService.deleteTrap(id);
  }
}
