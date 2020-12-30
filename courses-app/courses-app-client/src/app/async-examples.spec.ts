import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Examples', () => {
  let test: boolean;

  beforeEach(() => {
    test = false;
  });

  it('Async test example: Jasmine done()', (done: DoneFn) => {
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);

    expect(test).toBeFalsy();
  });

  it('Async test example: setTimeout()', fakeAsync(() => {
    setTimeout(() => test = true, 1000);
    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it('Async test example: plain Promise', fakeAsync(() => {
    Promise.resolve()
      .then(() => Promise.resolve())
      .then(() => test = true);

    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('Async test example: Promise + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;

        setTimeout(() => counter += 1, 1000);
      });

    expect(counter).toBe(0);

    flushMicrotasks();
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(11);
  }));

  it('Async test example: immediate Observable', () => {
    const test$ = of(test);

    test$.subscribe(() => test = true);
    expect(test).toBe(true);
  });

  it('Async test example: Observable', fakeAsync(() => {
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => test = true);
    tick(1000);
    expect(test).toBe(true);
  }));
});
