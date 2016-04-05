export default Ember.Helper.helper(function(params) {
  let value = params[0].split('').slice(0,34).join('');

  return value;
});
