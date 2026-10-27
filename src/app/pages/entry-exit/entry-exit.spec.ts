import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryExit } from './entry-exit';

describe('EntryExit', () => {
  let component: EntryExit;
  let fixture: ComponentFixture<EntryExit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryExit],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryExit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
