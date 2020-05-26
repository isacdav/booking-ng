import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditableComponent } from '../ediatble-component';

@Component({
  selector: 'bapp-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent extends EditableComponent {
  @Input() type: string = 'text';
}
