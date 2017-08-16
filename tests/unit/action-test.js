import ActionUnitTest from 'ember-unit-test-helpers/action';
import { module, test } from 'qunit';

import Ember from 'ember';
import sinon from 'sinon';

module('Unit | Test Helper | ActionUnitTest', {
  beforeEach() {
    this.context = {
      factory() {
        return Ember.Object.extend({
          foo: Ember.computed(function() {
            return 'bar';
          }),

          bar: Ember.computed(function() {
            return 'foo';
          }),

          actions: {
            run: sinon.stub().returns(Ember.RSVP.resolve())
          }
        })
      }
    };

    this.setup = function setup() {
      return {
        foo: 'foo'
      };
    };
  },

  afterEach() {
    this.context = null;
  }
});

test('#run', async function(assert) {
  let unit = new ActionUnitTest(this.context, 'run', this.setup, function verify(subject, compute) {
    let promise = compute('compute', 'compute');

    assert.equal(typeof promise.then, 'function');
    assert.ok(subject.actions.run.calledWith('compute', 'compute'));

    return promise;
  });

  let promise = unit.run();

  assert.equal(typeof promise.then, 'function');

  await promise;

  assert.expect(3);
});
