import UnitTest from './unit';

export default class PropertyUnitTest extends UnitTest {
  get undef() {
    let undef = {};
    let klass = this.class;

    klass.eachComputedProperty(name => {
      if (name !== this.target) {
        undef[name] = null;
      }
    });

    return undef;
  }

  run() {
    let { instance, context, target } = this;

    return this.verify.call(context, instance, this.computeFor(instance, function(value) {
      if (arguments.length) {
        instance.set(target, value);
      }

      return instance.get(target);
    }));
  }
}
