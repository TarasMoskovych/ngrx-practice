import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ToppingsService } from './toppings.service';
import { Topping, toppings } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

describe('ToppingsService', () => {
  let service: ToppingsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ToppingsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all toppings', () => {
    service.getToppings()
      .subscribe((response: Topping[]) => {
        expect(response).toBeTruthy();
        expect(response.length).toBe(toppings.length);
        expect(response).toEqual(toppings);
      });

    const req = httpController.expectOne('/api/toppings');
    expect(req.request.method).toBe('GET');
    req.flush(toppings);
  });

  it('should throw an error during getting toppings', () => {
    service.getToppings()
      .subscribe(
        () => fail('should not be success'),
        (e: HttpErrorResponse) => {
          expect(e).toBeTruthy();
          expect(e.status).toBe(500);
        }
      );

    const req = httpController.expectOne('/api/toppings');
    expect(req.request.method).toBe('GET');
    req.flush(toppings, { status: 500, statusText: 'Internal server error' });
  });
});
