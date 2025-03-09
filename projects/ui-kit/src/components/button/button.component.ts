import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IButton } from '../../interfaces/button.interface';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges{
  @Input() buttonData: IButton;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  clickedEvent() {
    this.clickEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['buttonData'] && this.buttonData?.disabled) {
      this.buttonData!.disabled = this.buttonData!.disabled;
    }
  }

} 