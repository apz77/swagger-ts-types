import { zeroPadNumber } from '../misc';

describe('Misc tests', () => {
  it('should call erorr handlers', () => {
    expect(zeroPadNumber(1, 2)).toEqual('01');
    expect(zeroPadNumber(1, 1)).toEqual('1');
    expect(zeroPadNumber(1345234, 10)).toEqual('0001345234');
  });
});
