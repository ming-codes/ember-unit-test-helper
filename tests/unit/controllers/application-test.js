import { moduleFor, test } from 'ember-qunit';
import { hook } from '../../helpers/unit';

hook();

moduleFor('controller:application', 'Unit | Controller | application', {
});

test('smoke', function(assert) {
  assert.equal(typeof this.unit.property, 'function');
  assert.equal(typeof this.unit.method, 'function');
  assert.equal(typeof this.unit.action, 'function');
});

test('property', function(assert) {
  this.unit.property('foo', {
    setup() {
      return {
        bar: 'foo'
      };
    },

    verify(subject, compute) {
      assert.equal(compute(), 'foo');
    }
  });
});

test('method', function(assert) {
});

test('action', function(assert) {
});
