import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ToppingsService } from './toppings.service';

describe('ToppingsService', () => {
  let service: ToppingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ToppingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
