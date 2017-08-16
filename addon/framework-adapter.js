export function pick({ chai, qunit }) {
  if (typeof self.chai !== 'undefined') {
    return chai;
  }
  else if (typeof self.QUnit !== 'undefined') {
    return qunit;
  }
  else {
    throw 'Unsupported test framework';
  }
}
