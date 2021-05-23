import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomGameDialogComponent } from './random-game-dialog.component';

describe('RandomGameDialogComponent', () => {
  let component: RandomGameDialogComponent;
  let fixture: ComponentFixture<RandomGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
