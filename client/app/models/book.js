import DS from 'ember-data';

export default DS.Model.extend({
  title : DS.attr('string'),
  link  : DS.attr('string'),
  image : DS.attr('string'),
  userId : DS.attr('number'),
  isTrading : DS.attr('boolean')
});
