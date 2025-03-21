import { TestBed } from "@angular/core/testing";
import { IField, IForm, IInput } from "../../interfaces";
import { FormComponent } from "./form.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe('FormComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({})
            }
          }
        ]
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(FormComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the elements', () => {
        const fixture = TestBed.createComponent(FormComponent);
        const compiled = fixture.nativeElement as HTMLElement;
  
        const formData: IForm = {
            fields: [
                {
                    name: 'input',
                    type: 'input',
                    class: 'col-12',
                    input:{
                        id: 'input',
                        label: 'label',
                        placeholder: 'placeholder',
                        value: 'value',
                        formControlName: 'input',
                        disabled: false,
                    } as IInput,
                    validators: [],
                } as IField],
                leftButtonForm: {
                    customClass: 'submit',
                    label: 'submit',
                    routerLink: '',
                    disabled: false,
                },
                rigthButtonForm: {
                    customClass: 'submit',
                    label: 'submit',
                    routerLink: '',
                    disabled: false,
                },
        };

        fixture.componentRef.setInput('formData', formData);
        fixture.detectChanges();
    
        const labelElement = compiled.querySelector('label');
        const inputElement = compiled.querySelector('input');

        expect(labelElement).toBeTruthy();
        expect(inputElement).toBeTruthy();
    
      });

});