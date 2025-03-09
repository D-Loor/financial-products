import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { IInput } from '../../interfaces/input.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {
  @Input() controlName: string;
  @Input() inputData: IInput;
  @Input() formGroup: FormGroup;
  @Output() outputData: EventEmitter<string> = new EventEmitter<string>();
  formControl: FormControl;
  type = "password";
  srcImagenPassword = "assets/svgs/eye-slash.svg";

  inputEvent(event: Event) {
    if(this.formGroup) {
      let textType = this.formGroup!.get(this.inputData?.formControlName!)?.value;
      return this.outputData.emit(textType);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['controlName'] && this.formGroup) {
      this.formControl = this.formGroup!.get(this.inputData?.formControlName!) as FormControl;
    }
  }

  changeType() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.srcImagenPassword = this.type === 'password' ? "assets/svgs/eye-slash.svg" : "assets/svgs/eye.svg";
  }

  validateInput(): boolean {
    return this.formGroup!.get(this.inputData!.formControlName)?.invalid &&
      (this.formGroup!.get(this.inputData!.formControlName)?.dirty ||
      this.formGroup!.get(this.inputData!.formControlName)?.touched);
  }
  
}