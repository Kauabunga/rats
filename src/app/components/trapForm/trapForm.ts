import {Component, Input, Output, EventEmitter, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import {TrapService} from "../../trap.service";
import {TrapItem} from "../trapItem/trapItem";


@Component({
  selector: 'trap-form',
  pipes: [],
  providers: [],
  directives: [TrapItem],
  styleUrls: ['./trapForm.less'],
  templateUrl: './trapForm.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrapForm implements AfterViewChecked {

  @Input() traps: any;

  @Output() created = new EventEmitter();
  @Output() changed = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(private trapService: TrapService) {}

  ngOnInit() {}

  ngAfterViewChecked(){
    console.log('TrapForm After view checked');
  }

}
