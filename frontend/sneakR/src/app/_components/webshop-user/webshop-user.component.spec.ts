import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopUserComponent } from './webshop-user.component';

describe('WebshopUserComponent', () => {
  let component: WebshopUserComponent;
  let fixture: ComponentFixture<WebshopUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebshopUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebshopUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
