import { Serializer } from '../serializer';
import { FolderType, InvitationStatus, Permit } from '../types';
import { UUID } from '../types/uuid';
import { Email } from '../types/email';
import { Hostname } from '../types/hostname';
import { Duration } from '../types/duration';
import { DateTime } from '../types/dateTime';
import { DateOnly } from '../types/dateOnly';

function testValue(value: Serializer.SerializableTypes, expected: any) {
  const result = Serializer.serializeValue(value, null);
  expect(result).toEqual(expected);
}

describe('Serializer test', () => {
  it('should serialize everything', () => {
    testValue(null, null);
    testValue(123, 123);
    testValue(true, true);
    testValue(FolderType.FileFolder, 2);
    testValue(Permit.CREATE, 1);
    testValue(InvitationStatus.Accepted, 2);
    testValue(new UUID('2497afaa-b03c-4b05-9c0c-7088cbadf4be'), '2497afaa-b03c-4b05-9c0c-7088cbadf4be');
    testValue(new Email('abc@cde.com'), 'abc@cde.com');
    testValue(new Hostname('mail.ru'), 'mail.ru');
    testValue(new Duration('PT2H1M10S'), 'PT2H1M10S');
    testValue(new DateTime('2017-05-21T21:58:18Z'), '2017-05-21T21:58:18.000Z');
    testValue(new DateOnly('2017-05-21'), '2017-05-21');
    testValue({ id: '2497afaa-b03c-4b05-9c0c-7088cbadf4be' }, '2497afaa-b03c-4b05-9c0c-7088cbadf4be');
    testValue([{ id: '2497afaa-b03c-4b05-9c0c-7088cbadf4be' }], ['2497afaa-b03c-4b05-9c0c-7088cbadf4be']);

    testValue(
      { field1: new Hostname('ya.ru'), field2: { id: 1243 } },
      { field1: 'ya.ru', field2: 1243 },
    );

    const result = Serializer.serializeValue({ some: 123 }, null);
    expect(result).toEqual(expect.objectContaining({ some:123 }));
  });
});
