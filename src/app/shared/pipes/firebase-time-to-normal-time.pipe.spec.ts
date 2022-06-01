import { FirebaseTimeToNormalTimePipe } from './firebase-time-to-normal-time.pipe';

describe('FirebaseTimeToNormalTimePipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseTimeToNormalTimePipe();
    expect(pipe).toBeTruthy();
  });
});
