import Ember from 'ember';
import PropertyUnitTest from 'ember-unit-test-helpers/property';
import { module, test } from 'qunit';

module('Unit | Test Helper | PropertyUnitTest', {
  beforeEach() {
    this.context = {
      factory() {
        return Ember.Object.extend({
          foo: Ember.computed(function() {
            return 'bar';
          }),

          bar: Ember.computed(function() {
            return 'foo';
          }).readOnly()
        })
      }
    };

    this.setup = function setup() {
      return {
        bar: 'foo'
      };
    };
  },

  afterEach() {
    this.context = null;
    this.setup = null;
  }
});

test('#undef', function(assert) {
  let unit = new PropertyUnitTest(this.context, 'foo');
  let undef = unit.undef;

  assert.equal(typeof undef.foo, 'undefined');
  assert.equal(undef.bar, null);
  assert.equal(unit.instance.get('foo'), 'bar');
  assert.equal(unit.instance.get('bar'), null);
});

test('#run getter', function(assert) {
  let unit = new PropertyUnitTest(this.context, 'foo', this.setup, function verify(subject, compute) {
    assert.equal(Ember.typeOf(subject), 'instance');

    assert.equal(compute(), 'bar');
  });

  unit.run();

  assert.expect(2);
});

test('#run setter', function(assert) {
  let unit = new PropertyUnitTest(this.context, 'foo', this.setup, function verify(subject, compute) {
    assert.equal(Ember.typeOf(subject), 'instance');

    assert.equal(compute('foo'), 'foo');
  });

  unit.run();

  assert.expect(2);
});

