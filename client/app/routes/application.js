import Ember from 'ember';


export default Ember.Route.extend({
  model() {
    return  Ember.RSVP.hash({
      user : new Ember.RSVP.Promise(resolve => {
              this.store.find('user', 'current')
              .then(data => { resolve(data);} )
              .catch(err => { resolve({});});
           })
   });
  },

  setupController(controller, model) {
    controller.set('user', model.user);
  }
});
