import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PizzasService } from './pizzas.service';

describe('PizzasService', () => {
  let service: PizzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PizzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
