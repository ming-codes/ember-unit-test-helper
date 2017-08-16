import Ember from 'ember';
import FunctionUnitTest from 'ember-unit-test-helpers/function';
import { module, test } from 'qunit';

module('Unit | Test Helper | FunctionUnitTest', {
  beforeEach() {
    this.context = {
      factory() {
        return Ember.Object.extend({
          foo: Ember.computed(function() {
            return 'bar';
          }),

          bar: Ember.computed(function() {
            return 'foo';
          })
        })
      }
    };
  },

  afterEach() {
    this.context = null;
  }
});

test('#undef', function(assert) {
  let unit = new FunctionUnitTest(this.context, 'foo');
  let undef = unit.undef;

  assert.equal(undef.foo, null);
  assert.equal(undef.bar, null);
});
