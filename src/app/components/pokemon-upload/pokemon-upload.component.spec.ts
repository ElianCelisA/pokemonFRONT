import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonUploadComponent } from './pokemon-upload.component';

describe('PokemonUploadComponent', () => {
  let component: PokemonUploadComponent;
  let fixture: ComponentFixture<PokemonUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
