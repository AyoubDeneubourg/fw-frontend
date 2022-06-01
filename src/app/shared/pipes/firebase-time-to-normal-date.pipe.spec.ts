import { FirebaseTimeToNormalDatePipe } from './firebase-time-to-normal-date.pipe';

describe('FirebaseTimeToNormalDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseTimeToNormalDatePipe();
    expect(pipe).toBeTruthy();
  });
});
