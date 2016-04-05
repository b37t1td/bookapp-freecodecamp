import Ember from 'ember';
import Book from '../models/book';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  term : null,
  isLoading : false,
  isItemLoading : false,
  searchItems : Ember.A(),


  myBooks : function() {
    return this.store.peekAll('book').filterBy('userId', Number.parseInt(this.get('application.user.id'),10));
  }.property('model.[]','searchItems.[]'),

  actions : {
    search : function() {
      this.set('isLoading', true);
      let items = this.get('searchItems');
      items.clear();

      $.get('/api/books/search/' + encodeURIComponent(this.get('term')))
      .success(data => {

        data.forEach((item) => {

          if (typeof this.store.peekAll('book').findBy('id', item.id) === 'undefined') {
            items.pushObject({
              id    : item.id,
              title : item.title,
              image : item.thumbnail || 'https://placehold.it/100x150',
              link  : item.link
            });
          }
        });

        this.set('isLoading', false);
      })
      .error(err => {
        this.set('isLoading', false);
        this.set('term', '');
        items.clear();
      })
    },

    clearSearch : function() {
      this.get('searchItems').clear();
    },

    removeBook : function(item) {
      this.set('isItemLoading', true);
      item.destroyRecord().then(() => { this.set('isItemLoading', false); });
    },

    tradeBook : function(item) {
        this.set('isItemLoading', true);
      item.set('isTrading', true).save().then(() => { this.set('isItemLoading', false); });;
    },

    unTradeBook : function(item) {
        this.set('isItemLoading', true);
      item.set('isTrading', false).save().then(() => { this.set('isItemLoading', false); });;
    },

    addBook : function(item) {
      this.set('isItemLoading', true);
      let items = this.get('searchItems');
      item.userId = Number.parseInt(this.get('application.user.id'), 10);
      this.store.createRecord('book', item).save().then(() => {
        this.set('isItemLoading', false);
      });
      items.removeObject(item);
    }
  }

});
