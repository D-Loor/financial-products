import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDropdown } from '../../interfaces/dropdown.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dropdown',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges {
  @Input() dropdownData: IDropdown;
  @Input() formGroup: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  formControl!: FormControl;

  onChangeEvent(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value ?? '';
    this.onChange.emit(selectedValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['controlName'] && this.formGroup) {
      this.formControl = this.formGroup!.get(this.dropdownData?.formControlName!) as FormControl;
    }
  }
}