import Ember from 'ember';

export default Ember.Controller.extend({
  application : Ember.inject.controller(),
  user : Ember.computed.alias('application.user'),


  isFormInvalid : function() {
    if (this.get('user.name.length') < 1 || this.get('user.location.length') < 1) {
      return true;
    }
    return false;
  }.property('user.name', 'user.location'),

  actions : {
    saveUser : function() {
      this.get('user').save();
    }
  }

});
