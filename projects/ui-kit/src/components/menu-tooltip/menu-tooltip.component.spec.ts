import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTooltipComponent } from './menu-tooltip.component';

describe('MenuTooltipComponent', () => {
  let component: MenuTooltipComponent;
  let fixture: ComponentFixture<MenuTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuTooltipComponent]
    });
    fixture = TestBed.createComponent(MenuTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
