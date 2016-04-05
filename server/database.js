var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


module.exports = function Database(callback) {
  this.db = null;
  var self = this;

  mongo.connect(process.env.MONGO_URI, function(err, db) {
    if (err) return console.log(err);
    self.db = db;
    callback();
  });


  this.tradeBook = function(data, cb) {
    var books = db.collection('books');

    self.findBook({id : data.id}, function(err, book) {
      if (err) return cb(err);

      book.userId = data.userId;
      book.isTrading = false;

      books.update({_id : new ObjectId(book._id)}, {$set : book}, function(err, d) {
        if (err) return cb(err);
        cb(null, d);
      });
    });
  }

  this.removeBook = function(id, cb) {
    var books = db.collection('books');

    books.remove({_id : new ObjectId(id)}, function(err, d) {
      if (err) return cb(err);

      cb(null, d);
    });
  }

  this.findBooks = function(cb) {
    var books = db.collection('books');

    books.find({}).toArray(function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.findBook = function(filter, cb) {
    var books = db.collection('books');

    books.findOne(filter, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.saveBook = function(data, cb) {
    var books = db.collection('books');

    self.findBook({ id : data.id }, function(err, book) {
      if (err) return cb(err);

      if (book !== null && Number(data.userId) === Number(book.userId)) {
        books.update({_id : new ObjectId(book._id)}, {$set : data}, function(err, d) {
          if (err) return cb(err);
          cb(null, d);
        });
      } else {
        books.insert(data, function(err, d) {
          if (err) return cb(err);
          cb(null, d);
        });
      }

    });
  }

  this.saveUser = function(user, cb) {
    var logins = db.collection('logins');

    logins.update({_id : new ObjectId(user._id)}, {$set : user}, function(err) {
      if (err) return cb(err);

      cb(null, 'ok');
    });
  }

  this.findUser = function(id, cb) {
    var logins = db.collection('logins');

    logins.findOne({id : id}, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.createLogin = function(data, cb) {
    var logins = db.collection('logins');
    var userData = {
      id : data.id,
      login : data.login,
      image : data.avatar_url,
      name : data.name,
      location : data.location
    };
    logins.findOne({id : data.id}, function(err, data) {
      if (err) return cb(err);
      if (data === null) {
        logins.insert(userData, function(err, data) {
          if (err) return cb(err);
          cb(null, userData);
        })
      } else {
        cb(null, data);
      }
    });
  };


return this;
}
