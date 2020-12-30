import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PizzasService } from './pizzas.service';
import { Pizza, pizzas } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

describe('PizzasService', () => {
  let service: PizzasService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PizzasService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all pizzas', () => {
    service.getPizzas()
      .subscribe((response: Pizza[]) => {
        expect(response).toBeTruthy();
        expect(response.length).toBe(pizzas.length);
      });

    const req = httpController.expectOne('/api/pizzas');
    expect(req.request.method).toBe('GET');
    req.flush(pizzas);
  });

  it('should create a new pizza', () => {
    const payload: Pizza = {
      name: 'Test',
      toppings: [],
    };

    service.createPizza(payload)
      .subscribe((response: Pizza) => {
        expect(response).toBeTruthy();
        expect(response).toEqual({ ...payload, id: 5 });
      });

    const req = httpController.expectOne('/api/pizzas');
    expect(req.request.method).toBe('POST');
    req.flush({ ...payload, id: 5 });
  });

  it('should update existing pizza', () => {
    const updated: Pizza = { ...pizzas[0], name: 'Test' };

    service.updatePizza(updated)
      .subscribe((response: Pizza) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(updated);
      });

    const req = httpController.expectOne(`/api/pizzas/${updated.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updated);
  });

  it('should remove existing pizza', () => {
    service.removePizza(pizzas[1])
      .subscribe((response: Pizza) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(pizzas[1]);
      });

    const req = httpController.expectOne(`/api/pizzas/${pizzas[1].id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(pizzas[1]);
  });

  it('should throw an error during getting pizzas', () => {
    service.getPizzas()
      .subscribe(
        () => fail('should not be success'),
        (e: HttpErrorResponse) => {
          expect(e).toBeTruthy();
          expect(e.status).toBe(500);
        }
      );

    const req = httpController.expectOne('/api/pizzas');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal server error' });
  });

  it('should throw an error during creating new pizza', () => {
    const payload: Pizza = {
      name: 'Test',
      toppings: [],
    };

    service.createPizza(payload)
      .subscribe(
        () => fail('should not be success'),
        (e: HttpErrorResponse) => {
          expect(e).toBeTruthy();
          expect(e.status).toBe(500);
        }
      );

    const req = httpController.expectOne('/api/pizzas');
    expect(req.request.method).toBe('POST');
    req.flush({ ...payload, id: 5 }, { status: 500, statusText: 'Internal server error' });
  });

  it('should throw an error during updating existing pizza', () => {
    service.updatePizza(pizzas[0])
      .subscribe(
        () => fail('should not be success'),
        (e: HttpErrorResponse) => {
          expect(e).toBeTruthy();
          expect(e.status).toBe(500);
        }
      );

    const req = httpController.expectOne(`/api/pizzas/${pizzas[0].id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null, { status: 500, statusText: 'Internal server error' });
  });

  it('should throw an error during removing existing pizza', () => {
    service.removePizza(pizzas[0])
      .subscribe(
        () => fail('should not be success'),
        (e: HttpErrorResponse) => {
          expect(e).toBeTruthy();
          expect(e.status).toBe(500);
        }
      );

    const req = httpController.expectOne(`/api/pizzas/${pizzas[0].id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 500, statusText: 'Internal server error' });
  });
});
