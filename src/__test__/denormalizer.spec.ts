import { Deserializer, DeserializeResult } from '../deserializer';
import { UUID } from '../types/uuid';
import { Email } from '../types/email';
import { Hostname } from '../types/hostname';
import { DateTime } from '../types/dateTime';
import { DateOnly } from '../types/dateOnly';
import { Duration } from '../types/duration';
import { ModelWithId } from '../types/baseModel';

const knownType = 'KnownType';

function getModel(modelType: string, id: string): ModelWithId | Error {
  return {
    id,
  };
}

const isKnownType = (modelType: any) => {
  return modelType === knownType;
};

const mockFieldMetadata = {
  name: 'name',
  subType: '',
  isRequired: true,
  apiField: 'name',
};

function goodExpects(raw: any, expected: any, types: string[]) {
  const fieldMetadata = {
    ...mockFieldMetadata,
    types,
  };

  const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
  expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
  expect(denormalizedResult.getErrors()).toEqual([]);
  expect(denormalizedResult.getValue()).toEqual(expected);
}


function badExpects(raw: any, types: string[]) {
  const fieldMetadata = {
    ...mockFieldMetadata,
    types,
  };

  const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
  expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
  expect(denormalizedResult.getErrors()).toBeInstanceOf(Array);
  expect(denormalizedResult.getErrors().length).toEqual(1);
  expect(denormalizedResult.getErrors()[0]).toEqual(expect.stringContaining('Bad type or value'));
  expect(denormalizedResult.getValue()).toEqual(void 0);
}

describe('Required Prop ', () => {
  it('should check required prop', () => {

    const raw = void 0;

    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['string'],
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toEqual(expect.arrayContaining(['Required field name is undefined.']));
  });

  it('not denormalize bad type of prop', () => {
    const raw = 'abcs';
    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['BadType'],
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toBeInstanceOf(Array);
    expect(denormalizedResult.getErrors().length).toEqual(1);
    expect(denormalizedResult.getErrors()[0]).toEqual(expect.stringContaining('Bad type'));
    expect(denormalizedResult.getValue()).toEqual(void 0);
  });
});


describe('Deserializer ', () => {
  it('denormalize good UUID', () => {
    const raw = '2497afaa-b03c-4b05-9c0c-7088cbadf4be';
    const expected = new UUID('2497afaa-b03c-4b05-9c0c-7088cbadf4be');

    goodExpects(raw, expected, ['UUID']);
  });

  it('not denormalize bad UUID', () => {
    const raw = '34rlkj2497afaa-b03c-4b05-9c0c-7088cbadf4be';

    badExpects(raw, ['UUID']);
  });

  it('denormalize good Email', () => {
    const raw = 'abc@lkj.com';
    const expected  = new Email(raw);

    goodExpects(raw, expected, ['Email']);
  });

  it('not denormalize bad Email', () => {
    const raw = 'abclkj.com';

    badExpects(raw, ['Email']);
  });

  it('not denormalize empty Email', () => {
    const raw = '';
    badExpects(raw, ['Email']);
  });

  it('denormalize good Hostname', () => {
    const raw = 'google.com';
    const expected  = new Hostname(raw);

    goodExpects(raw, expected, ['Hostname']);
  });

  it('not denormalize bad Hostname', () => {
    const raw = '**&^&*^%&^%&$abclkj';
    badExpects(raw, ['Hostname']);
  });

  it('not denormalize empty Hostname', () => {
    const raw = '';
    badExpects(raw, ['Hostname']);
  });

  it('denormalize good DateTime', () => {
    const raw = '2017-05-21T21:58:18Z';
    const expected  = new DateTime(raw);

    goodExpects(raw, expected, ['DateTime']);
  });

  it('not denormalize bad DateTime', () => {
    const raw = '**&^&*^%&^%&$abclkj';
    badExpects(raw, ['DateTime']);
  });

  it('not denormalize empty DateTime', () => {
    const raw = '';
    badExpects(raw, ['DateTime']);
  });




  it('denormalize good DateOnly', () => {
    const raw = '2017-05-21';
    const expected  = new DateOnly(raw);

    goodExpects(raw, expected, ['DateOnly']);
  });

  it('not denormalize bad DateOnly', () => {
    const raw = '**&^&*^%&^%&$abclkj';
    badExpects(raw, ['DateOnly']);
  });

  it('not denormalize too big DateOnly', () => {
    const raw = '2017-99-00';
    badExpects(raw, ['DateOnly']);
  });

  it('not denormalize empty DateOnly', () => {
    const raw = '';
    badExpects(raw, ['DateOnly']);
  });



  it('denormalize good Duration', () => {
    const raw = 'PT2H1M10S';
    const expected  = new Duration(raw);

    goodExpects(raw, expected, ['Duration']);
  });

  it('not denormalize bad Duration', () => {
    const raw = '**&^&*^%&^%&$abclkj';
    badExpects(raw, ['Duration']);
  });



  it('denormalize good Array', () => {
    const raw = ['a', 'b', 'c'];
    const expected  = raw.slice();

    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['array'],
      subType: 'string',
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toEqual([]);
    expect(denormalizedResult.getValue()).toEqual(expected);
  });

  it('denormalize bad Array', () => {
    const raw = ['a', 123, false];
    const expected  = ['a'];

    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['array'],
      subType: 'string',
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toBeInstanceOf(Array);
    expect(denormalizedResult.getErrors().length).toEqual(2);
    expect(denormalizedResult.getErrors()[0]).toEqual(expect.stringContaining('Invalid value 123'));
    expect(denormalizedResult.getErrors()[1]).toEqual(expect.stringContaining('Invalid value false'));
    expect(denormalizedResult.getValue()).toEqual(expected);
  });

  it('denormalize good Array of objects', () => {
    const raw = [
      {
        one: '1',
        two: '2',
      },
      {
        three: '3',
        four: '4',
      },
    ];
    const expected  = raw.slice();

    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['array'],
      subType: 'object',
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toEqual([]);
    expect(denormalizedResult.getValue()).toEqual(expected);
  });

  it('denormalize good Array of JSON', () => {
    const raw = [
      {
        one: '1',
        two: '2',
      },
      {
        three: '3',
        four: '4',
      },
    ];
    const expected  = raw.slice();

    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['array'],
      subType: 'JSON',
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toEqual([]);
    expect(denormalizedResult.getValue()).toEqual(expected);
  });

  it('denormalize bad Object', () => {
    const raw = 1234;

    badExpects(raw, ['object']);
  });

  it('denormalize good link', () => {
    const raw = '2497afaa-b03c-4b05-9c0c-7088cbadf4be';
    const expected  = getModel(knownType, raw);

    const fieldMetadata = {
      ...mockFieldMetadata,
      types: ['link'],
      subType: knownType,
    };

    const denormalizedResult = Deserializer.denormalizeProp(raw, fieldMetadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toEqual([]);
    expect(denormalizedResult.getValue()).toEqual(expected);
  });

  it ('denormalize multitype value', () => {
    goodExpects(123, 123, ['number', 'string', 'null']);
    goodExpects('123', '123', ['number', 'string', 'null']);
    goodExpects(null, null, ['number', 'string', 'null']);
    goodExpects({}, {}, ['number', 'object', 'null']);
    goodExpects({ a: 1 }, { a: 1 }, ['number', 'object', 'null']);
    goodExpects(null, null, ['link', 'null']);
  });

  it('denormalize good raw Model', () => {
    const raw = {
      id: '2497afaa-b03c-4b05-9c0c-7088cbadf4be',
      accountId: '1234afaa-b03c-4b05-9c0c-7088cbadf400',
    };

    const expected  = {
      id: '2497afaa-b03c-4b05-9c0c-7088cbadf4be',
      account: {
        id: '1234afaa-b03c-4b05-9c0c-7088cbadf400',
      },
    };

    const metadata = {
      modelType: knownType,
      emptyModel: { id: void 0, name: void 0, account: void 0 },
      fields: {
        id: {
          name: 'id',
          types: ['string'],
          subType: '',
          isRequired: true,
          apiField: 'id',
        },
        name: {
          name: 'name',
          types: ['string'],
          subType: '',
          isRequired: false,
          apiField: 'name',
        },
        account: {
          name: 'account',
          types: ['link'],
          subType: knownType,
          isRequired: true,
          apiField: 'accountId',
        },
      },
    };

    const denormalizedResult = Deserializer.denormalizeRawModel(raw, metadata, getModel, isKnownType);
    expect(denormalizedResult).toBeInstanceOf(DeserializeResult);
    expect(denormalizedResult.getErrors()).toEqual([]);
    expect(denormalizedResult.getValue()).toEqual(expected);
  });

});
