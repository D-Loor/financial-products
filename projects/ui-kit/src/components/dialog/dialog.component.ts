import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DialogService } from '../../services/utils/dialog.service';
import { IDialog } from '../../interfaces/dialog.interface';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { IButton } from '../../interfaces';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private dialogService = inject(DialogService);

  dialogData: IDialog | undefined;
  @Output() clickLeftButton: EventEmitter<void> = new EventEmitter();
  @Output() clickRightButton: EventEmitter<void> = new EventEmitter();
  @Input() presentDialog: boolean = true;
  showDialog = false;

  buttonLeftData: IButton = {
    customClass: "secondary",
    label: "Cancelar",
    disabled: false
  };
  buttonRightData: IButton = {
    customClass: "primary",
    label: "Confirmar",
    disabled: false
  };

  constructor() {
    this.dialogService.$dialogData.subscribe(dialogData => {     
      this.showDialog = true;
      this.dialogData = dialogData;
      this.buttonLeftData.label = this.dialogData?.labelButtonLeft || "Cancelar";
      this.buttonRightData.label = this.dialogData?.labelButtonRight || "Confirmar";
    });
  }

  onClose() {
    this.showDialog = false;
  }

  onClickLeftButton() {
    this.showDialog = false;
    this.clickLeftButton.emit();
  }

  onClickRightButton() {
    this.clickRightButton.emit();
  }

}
