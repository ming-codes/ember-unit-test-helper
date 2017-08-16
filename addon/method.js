import FunctionUnitTest from './function';

export default class MethodUnitTest extends FunctionUnitTest {
  run() {
    let { instance, context, target } = this;

    return this.verify.call(context, instance, this.computeFor(instance, function() {
      return instance[target].apply(instance, arguments);
    }));
  }
}
