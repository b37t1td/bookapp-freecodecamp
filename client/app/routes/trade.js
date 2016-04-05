import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('book', {reload : true});
  },

  setupController(controller, model) {
    controller.set('books', model);
  }
});
