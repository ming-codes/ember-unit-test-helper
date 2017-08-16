import PropertyUnitTest from 'ember-unit-test-helpers/property';
import MethodUnitTest from 'ember-unit-test-helpers/method';
import ActionUnitTest from 'ember-unit-test-helpers/action';

import TestModule from 'ember-test-helpers/test-module';
import { getContext } from 'ember-test-helpers/test-context';

const { setupContext, teardownContext } = TestModule.prototype;

function wrap(original, callback) {
  return function wrapped() {
    return callback.call(this, original, ...arguments);
  };
}

export function hook() {
  let context = getContext();

  //
  // QUnit and Mocha get attached differently
  //
  // Mocha copies properties from context to mocha context
  //   https://github.com/emberjs/ember-mocha/blob/56f5fd35467583c4638b9b3f85f6c881342c9b4c/lib/ember-mocha/mocha-module.js#L33-L36
  //
  // QUnit set context to qunit context
  //   https://github.com/emberjs/ember-qunit/blob/8278a2e696ca698249d0aef19234a0300249f9d8/lib/ember-qunit/qunit-module.js#L44
  //
  context.unit = Object.freeze({
    property(target, { setup, verify }) {
      return new PropertyUnitTest(getContext(), target, setup, verify).run();
    },
    method(target, { setup, verify }) {
      return new MethodUnitTest(getContext(), target, setup, verify).run();
    },
    action(target, { setup, verify }) {
      return new ActionUnitTest(getContext(), target, setup, verify).run();
    }
  });

  TestModule.prototype.setupContext = wrap(setupContext, function setupContext(original, ...args) {
    this.context.unit = context.unit;

    return original.apply(this, args);
  });

  TestModule.prototype.teardownContext = wrap(teardownContext, function teardownContext(original, ...args) {
    this.context.unit = null;

    return original.apply(this, args);
  });
}

export function unhook() {
  TestModule.prototype.setupContext = setupContext;
  TestModule.prototype.teardownContext = teardownContext;
}
