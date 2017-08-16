import UnitTest from 'ember-unit-test-helpers/unit';
import { module, test } from 'qunit';
import sinon from 'sinon';
import Ember from 'ember';

module('Unit | Test Helper | UnitTest');

test('.propertiesFor', function(assert) {
  let normalized = UnitTest.propertiesFor({
    method: sinon.stub().returns(1),

    object: {
      array: [
        Ember.ObjectProxy.create({
          content: {
            property: 2
          }
        })
      ]
    }
  });

  assert.equal(Ember.typeOf(normalized), 'object');
  assert.equal(Ember.typeOf(normalized.method), 'function');
  assert.equal(Ember.typeOf(normalized.object), 'instance');
  assert.equal(Ember.typeOf(normalized.object.get('array')), 'array');
  assert.equal(normalized.object.get('array').get('firstObject.property'), 2);
});

test('#class with extend factory', function(assert) {
  let unit = new UnitTest({
    factory() {
      return Ember.Object.extend({})
    }
  });

  assert.equal(Ember.typeOf(unit.class), 'class');
});

test('#class with proxy factory', function(assert) {
  let unit = new UnitTest({
    factory() {
      return new Proxy({}, {
        get(target, property) {
          if (property === 'class') {
            return Ember.Object.extend({})
          }
        }
      });
    }
  });

  assert.equal(Ember.typeOf(unit.class), 'class');
});

test('#factory', function(assert) {
  let unit = new UnitTest({
    factory() {
      return Ember.Object.extend({
        foo: Ember.computed(function() {
          return 'bar';
        })
      })
    }
  });

  assert.equal(unit.factory.create().get('foo'), 'bar');
});

test('#instance', function(assert) {
  let unit = new UnitTest({
    factory() {
      return Ember.Object.extend({
        foo: Ember.computed(function() {
          return 'bar';
        })
      })
    }
  });

  assert.equal(unit.instance.get('foo'), 'bar');
});

test('#computeFor', function(assert) {
  let setup = function *() {
    yield 1;
    yield 2;
  };
  let unit = new UnitTest({
    factory() {
      return Ember.Object.extend({
        foo: Ember.computed(function() {
          return 'bar';
        })
      })
    }
  }, 'foo', setup);
  let callback = sinon.stub().returns('stub');

  let compute = unit.computeFor(unit.instance, callback);

  assert.equal(compute('compute'), 'stub');
  assert.ok(callback.calledWith('compute'));

  callback.resetHistory();

  assert.equal(compute('compute'), 'stub');
  assert.ok(callback.calledWith('compute'));

  callback.resetHistory();

  assert.throws(function() {
    compute('compute')
  });
});
