import * as fromRouter from './router.actions';

describe('Router Actions', () => {
  describe('Go', () => {
    it('should create an action', () => {
      const payload = { path: ['/products'] };
      const action = new fromRouter.Go(payload);

      expect({ ...action }).toEqual({
        type: fromRouter.GO,
        payload,
      });
    });
  });

  describe('Back', () => {
    it('should create an action', () => {
      const action = new fromRouter.Back();

      expect({ ...action }).toEqual({
        type: fromRouter.BACK,
      });
    });
  });

  describe('Forward', () => {
    it('should create an action', () => {
      const action = new fromRouter.Forward();

      expect({ ...action }).toEqual({
        type: fromRouter.FORWARD,
      });
    });
  });
});
