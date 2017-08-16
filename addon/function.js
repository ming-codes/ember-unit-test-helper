import UnitTest from './unit';

export default class FunctionUnitTest extends UnitTest {
  get undef() {
    let undef = {};

    this.class.eachComputedProperty(name => {
      undef[name] = null;
    });

    return undef;
  }
}
