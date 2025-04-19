import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeModificationComponent } from './shoe-modification.component';

describe('ShoeModificationComponent', () => {
  let component: ShoeModificationComponent;
  let fixture: ComponentFixture<ShoeModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoeModificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoeModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
