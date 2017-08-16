import Ember from 'ember';

export default Ember.Controller.extend({
  foo: Ember.computed.readOnly('bar'),

  bar: Ember.computed(function() {
    return 'bar';
  }).readOnly()
});
