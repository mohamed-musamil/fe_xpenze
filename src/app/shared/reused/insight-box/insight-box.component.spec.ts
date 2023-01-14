import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightBoxComponent } from './insight-box.component';

describe('InsightBoxComponent', () => {
  let component: InsightBoxComponent;
  let fixture: ComponentFixture<InsightBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
