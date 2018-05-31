import { DateOnly } from '../types/dateOnly';

describe('DateOnly ', () => {
  it('creates DateOnly from string 2017-05-21', () => {
    const result = new DateOnly('2017-05-21');
    const expected = new DateOnly({ year: 2017, month: 5, day: 21 });
    expect(result).toEqual(expected);
  });
})
