import { TestBed } from "@angular/core/testing";
import { DialogComponent } from "./dialog.component";
import { IDialog } from "../../interfaces/dialog.interface";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";


describe('DialogComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DialogComponent],
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
      const fixture = TestBed.createComponent(DialogComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the elements', () => {
      const fixture = TestBed.createComponent(DialogComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      const component = fixture.componentInstance;

      const dialogData: IDialog = {
          title: 'title',
          description: 'description',
          labelButtonLeft: 'left',
          labelButtonRight: 'right',
      };
  
      fixture.componentRef.setInput('presentDialog', true);
      component.showDialog = true;
      component.dialogData = dialogData;
      fixture.detectChanges();
  
      const badgeElement = compiled.querySelector('h4');
      
      expect(badgeElement).toBeTruthy();
  
    });

});
