import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  shouldReloadAll: function(store, snapshot) {
    return true;
  }
});
