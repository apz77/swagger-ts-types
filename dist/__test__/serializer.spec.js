"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("../serializer");
const types_1 = require("../types");
const uuid_1 = require("../types/uuid");
const email_1 = require("../types/email");
const hostname_1 = require("../types/hostname");
const duration_1 = require("../types/duration");
const dateTime_1 = require("../types/dateTime");
const dateOnly_1 = require("../types/dateOnly");
function testValue(value, expected) {
    const result = serializer_1.Serializer.serializeValue(value);
    expect(result).toEqual(expected);
}
describe('Serializer test', () => {
    it('should serialize everything', () => {
        testValue(null, null);
        testValue(123, 123);
        testValue(true, true);
        testValue(types_1.FolderType.FileFolder, 2);
        testValue(types_1.Permit.CREATE, 1);
        testValue(types_1.InvitationStatus.Accepted, 2);
        testValue(new uuid_1.UUID('2497afaa-b03c-4b05-9c0c-7088cbadf4be'), '2497afaa-b03c-4b05-9c0c-7088cbadf4be');
        testValue(new email_1.Email('abc@cde.com'), 'abc@cde.com');
        testValue(new hostname_1.Hostname('mail.ru'), 'mail.ru');
        testValue(new duration_1.Duration('PT2H1M10S'), 'PT2H1M10S');
        testValue(new dateTime_1.DateTime('2017-05-21T21:58:18Z'), '2017-05-21T21:58:18.000Z');
        testValue(new dateOnly_1.DateOnly('2017-05-21'), '2017-05-21');
        testValue({ id: '2497afaa-b03c-4b05-9c0c-7088cbadf4be' }, '2497afaa-b03c-4b05-9c0c-7088cbadf4be');
        testValue([{ id: '2497afaa-b03c-4b05-9c0c-7088cbadf4be' }], ['2497afaa-b03c-4b05-9c0c-7088cbadf4be']);
        testValue({ field1: new hostname_1.Hostname('ya.ru'), field2: { id: 1243 } }, { field1: 'ya.ru', field2: 1243 });
        const result = serializer_1.Serializer.serializeValue({ some: 123 });
        expect(result).toEqual(expect.objectContaining({ some: 123 }));
    });
});
