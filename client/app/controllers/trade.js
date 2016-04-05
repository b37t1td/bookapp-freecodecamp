import Ember from 'ember';

export default Ember.Controller.extend({
  application : Ember.inject.controller(),
  isLoading: false,

  othersBooks : function() {
    let user = Number.parseInt(this.get('application.user.id')) || null;
    let records = this.get('books');
    if (!user) {
      return records;
    }
    return records.filter((r) => r.get('userId') !== user);
  }.property('books', 'books.[]'),


  actions: {
    takeBook(item) {
      this.set('isLoading', true);

      $.ajax({
        method: 'POST',
        url : '/api/books/trade/' + item.get('id')
      }).success(() => {
        item.set('userId', Number.parseInt(this.get('application.user.id')))
        item.set('isTrading', false);
        this.set('isLoading', false);
      });
    }
  }
});
