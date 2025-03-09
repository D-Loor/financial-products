import { TestBed } from "@angular/core/testing";
import { CardComponent } from "./card.component";
import { IButton } from "../../interfaces/button.interface";

describe('CardComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CardComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(CardComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the provided component in the ngComponentOutlet', () => {
      const fixture = TestBed.createComponent(CardComponent);
      const compiled = fixture.nativeElement as HTMLElement;

      const cardData: IButton = {
        class: 'primary',
        label: 'test',
        disabled: false        
      };
  
      fixture.componentRef.setInput('cardData', cardData);
      fixture.detectChanges();
  
      const badgeElement = compiled.querySelector('app-button');
      
      expect(badgeElement).toBeTruthy();
  
    });

});