import DS from 'ember-data';

export default DS.Model.extend({
  login  : DS.attr('string'),
  image  : DS.attr('string'),
  name   : DS.attr('string'),
  location : DS.attr('string')
});
