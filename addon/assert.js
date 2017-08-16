import { pick } from './framework-adapter';

export const equal = pick({
  chai(actual, expect, message) {
    expect(actual).to.equal(expect, message);
  },

  qunit(actual, expect, message) {
    QUnit.config.current.assert.deepEqual(actual, expect, message);
  }
});

export const deepEqual = pick({
  chai(actual, expect, message) {
    expect(actual).to.deep.equal(expect, message);
  },

  qunit(actual, expect, message) {
    QUnit.config.current.assert.deepEqual(actual, expect, message);
  }
});
