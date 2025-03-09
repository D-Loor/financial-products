import { Component, inject, Input, Output } from '@angular/core';
import { DialogService } from '../../services/utils/dialog.service';
import { IDialog } from '../../interfaces/dialog.interface';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private dialogService = inject(DialogService);

  dialogData: IDialog | undefined;
  @Output() clickLeftButton = new Output();
  @Output() clickRightButton = new Output();
  @Input() presentDialog: boolean = true;
  showDialog = false;

  constructor() {
    this.dialogService.$dialogData.subscribe(dialogData => {     
      this.showDialog = true;
      this.dialogData = dialogData;
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
