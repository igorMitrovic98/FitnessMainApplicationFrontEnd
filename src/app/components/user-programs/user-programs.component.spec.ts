import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgramsComponent } from './user-programs.component';

describe('UserProgramsComponent', () => {
  let component: UserProgramsComponent;
  let fixture: ComponentFixture<UserProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProgramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
