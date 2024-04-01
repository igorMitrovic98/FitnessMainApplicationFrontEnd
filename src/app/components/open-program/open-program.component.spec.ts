import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenProgramComponent } from './open-program.component';

describe('OpenProgramComponent', () => {
  let component: OpenProgramComponent;
  let fixture: ComponentFixture<OpenProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
