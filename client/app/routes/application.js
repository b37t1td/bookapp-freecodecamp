import Ember from 'ember';


export default Ember.Route.extend({
  model() {
    return this.store.find('user', 'current');
  },

  setupController(controller, model) {

  },

  actions: {
     error(error, transition) {
      // user not found
     }
  }
});
