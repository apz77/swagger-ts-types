import { Duration } from '../types/duration';

describe('Duration', () => {
  it('creates Duration from string PT1M', () => {
    const duration = new Duration('PT30M');
    const expected = new Duration({ minutes: 30 });
    expect(duration).toEqual(expected);
  });

  it('creates Duration from string PT2H1M10S', () => {
    const duration = new Duration('PT2H1M10S');
    const expected = new Duration({
      hours: 2,
      minutes: 1,
      seconds: 10,
    });
    expect(duration).toEqual(expected);
  });

  it('creates Duration from string P10WT', () => {
    const duration = new Duration('P10WT');
    const expected = new Duration({
      weeks: 10,
    });
    expect(duration).toEqual(expected);
  });

  it('creates PT2H1M10S from Duration (serialize)', () => {
    const duration = new Duration({ days: 2, hours: 3, minutes: 4 });
    const expected = 'P2DT3H4M';
    expect(duration.serialize()).toEqual(expected);
  });

  it('should throw Error trying to getMS', () => {
    const duration = new Duration({ months: 1 });
    const getGetMSFunction = () => () => duration.getMS();
    expect(getGetMSFunction()).toThrowError(Error);
  });

  it('should throw Error trying to serialize', () => {
    const duration = new Duration({ months: 1 });
    const getGetMSFunction = () => () => duration.serialize();
    expect(getGetMSFunction()).toThrowError(Error);
  });

});
