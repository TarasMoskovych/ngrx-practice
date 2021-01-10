import { TestBed } from '@angular/core/testing';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { CourseEntityService } from './course-entity.service';

class EntityCollectionServiceElementsFactoryMock {
  create() {
    return {
      dispatcher: jasmine.createSpy(),
      selectors$: jasmine.createSpy(),
      selectors: jasmine.createSpy(),
    };
  }
}

describe('CourseEntityService', () => {
  let service: CourseEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseEntityService,
        {
          provide: EntityCollectionServiceElementsFactory,
          useClass: EntityCollectionServiceElementsFactoryMock,
        },
      ],
    });

    service = TestBed.inject(CourseEntityService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
