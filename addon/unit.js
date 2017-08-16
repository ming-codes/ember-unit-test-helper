import Ember from 'ember';

export default class UnitTest {
  static propertiesFor(hash) {
    let proto = Object.getPrototypeOf(hash);

    if (proto === null || proto === Object.prototype) {
      return Object.keys(hash).reduce((accum, key) => {
        let object = UnitTest.propertiesFor(hash[key]);

        if (Ember.typeOf(object) === 'object') {
          object = Ember.Object.create(object);
        }

        accum[key] = object;

        return accum;
      }, {});
    }
    else if (proto === Array.prototype) {
      return Ember.A(hash.map(UnitTest.propertiesFor));
    }
    else {
      return hash;
    }
  }

  constructor(context, target, setup, verify) {
    this.context = context;
    this.target = target;
    this.verify = verify;

    this.setup = function *() {
      let it = setup(); // FIXME run loop

      if (it && typeof it.next === 'function' && it.next.length === 1) {
        for (let item of it) {
          yield item;
        }
      }
      else {
        yield it;
      }

      throw new Error('setup has exhausted values');
    }
  }

  get undef() {
    return {
    };
  }

  get class() {
    let factory = this.context.factory();

    if (typeof factory.class === 'function') {
      return factory.class;
    }

    return factory;
  }

  get factory() {
    return this.class.extend(this.undef);
  }

  get instance() {
    return this.factory.create();
  }

  computeFor(instance, callback) {
    let iterable = this.setup();
    let undef = this.undef;

    return function compute() {
      instance.setProperties(undef);
      instance.setProperties(UnitTest.propertiesFor(iterable.next().value));

      return callback.apply(this, arguments);
    };
  }
}
