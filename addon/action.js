import FunctionUnitTest from './function';

export default class ActionUnitTest extends FunctionUnitTest {
  run() {
    let { instance, context, target } = this;

    return this.verify.call(context, instance, this.computeFor(instance, function() {
      return instance.actions[target].apply(instance, arguments);
    }));
  }
}
