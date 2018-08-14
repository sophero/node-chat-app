const expect = require('expect');
const { isRealString } = require('./validation');


describe('#isRealString', () => {
  it('should reject non-string values', () => {
    const response = isRealString(true);
    // expect(response).toBeFalsy();
    expect(response).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    const response = isRealString('   ');
    // expect(response).toBeFalsy();
    expect(response).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    const response = isRealString(' hey');
    // expect(response).toBeTruthy();
    expect(response).toBe(true);
  });
});