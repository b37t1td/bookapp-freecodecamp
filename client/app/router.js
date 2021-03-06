import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path : '/'});
  this.route('profile', {path : '/profile'});
  this.route('mybooks', {path : '/mybooks'});
  this.route('trade', {path : '/trade'});
});

export default Router;
