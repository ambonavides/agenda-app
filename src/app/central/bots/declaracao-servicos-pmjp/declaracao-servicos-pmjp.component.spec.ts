import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracaoServicosPmjpComponent } from './declaracao-servicos-pmjp.component';

describe('DeclaracaoServicosPmjpComponent', () => {
  let component: DeclaracaoServicosPmjpComponent;
  let fixture: ComponentFixture<DeclaracaoServicosPmjpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclaracaoServicosPmjpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracaoServicosPmjpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
