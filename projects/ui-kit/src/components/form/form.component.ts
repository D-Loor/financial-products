import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";
import { InputComponent } from "../input/input.component";
import { FormService } from '../../services/utils/form.service';
import { IForm } from '../../interfaces/form.interface';

@Component({
  standalone: true,
  selector: 'app-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  formService = inject(FormService);
  @Input() formData: IForm;

  form!: FormGroup;
  loadFields: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.loadFields && this.formData?.fields) {
      this.buildForm();
    }
  }

  buildForm(): void {
    const controls: any = {};
    this.formData?.fields?.forEach((field) => {
      const control = this.fb.control(
        {
            value: field.input?.value || '',
            disabled: field.input?.disabled || false
        },
          field.validators || []
      );
      controls[field.name] = control;
    });
    this.form = this.fb.group(controls);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.formService.sendForm(this.form.value);
    } else {
      //this.toastService.emitToast("Error", "Inconsistency in fields", "error", true);
    }
  }

}