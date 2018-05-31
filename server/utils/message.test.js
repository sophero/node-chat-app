var expect = require('expect');
var toBeType = require('jest-tobetype');
expect.extend(toBeType);

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  // synchronous test so no need to call done()
  it('should generate correct message object', () => {
    // Set message values
    var from = 'sophia';
    var text = 'testing message generator';

    // store response in variable
    var response = generateMessage(from, text);

    // assert createdAt is number
    expect(response.createdAt).toBeType('number');

    // assert from match
    expect(response.from).toEqual(from);

    // assert text match
    expect(response.text).toEqual(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var lat = 38;
    var lng = 28;
    var url = `https://www.google.com/maps?q=${lat},${lng}`;
    var message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeType('number');
    expect(message).toMatchObject({ from, url });
  });
});
