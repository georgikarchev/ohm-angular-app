import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageToRoomComponent } from './add-image-to-room.component';

describe('AddImageToRoomComponent', () => {
  let component: AddImageToRoomComponent;
  let fixture: ComponentFixture<AddImageToRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImageToRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
