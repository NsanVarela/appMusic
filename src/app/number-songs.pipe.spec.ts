import { NumberSongsPipe } from './number-songs.pipe';

describe('NumberSongsPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberSongsPipe();
    expect(pipe).toBeTruthy();
  });
});
