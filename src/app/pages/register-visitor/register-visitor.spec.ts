import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterVisitor } from './register-visitor';

describe('RegisterVisitor', () => {
  let component: RegisterVisitor;
  let fixture: ComponentFixture<RegisterVisitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterVisitor],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterVisitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
