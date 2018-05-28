var expect = require('expect');
var toBeType = require('jest-tobetype');
expect.extend(toBeType);

var { generateMessage } = require('./message');

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
