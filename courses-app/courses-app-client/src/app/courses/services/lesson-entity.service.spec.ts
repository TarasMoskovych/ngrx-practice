import { TestBed } from '@angular/core/testing';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { LessonEntityService } from './lesson-entity.service';

class EntityCollectionServiceElementsFactoryMock {
  create() {
    return {
      dispatcher: jasmine.createSpy(),
      selectors$: jasmine.createSpy(),
      selectors: jasmine.createSpy(),
    };
  }
}

describe('LessonEntityService', () => {
  let service: LessonEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LessonEntityService,
        {
          provide: EntityCollectionServiceElementsFactory,
          useClass: EntityCollectionServiceElementsFactoryMock,
        },
      ],
    });

    service = TestBed.inject(LessonEntityService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
