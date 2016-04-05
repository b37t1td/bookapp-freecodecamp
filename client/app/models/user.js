import DS from 'ember-data';

export default DS.Model.extend({
  userId : DS.attr('Number'),
  login  : DS.attr('String'),
  image  : DS.attr('String'),
  location : DS.attr('String')
});
