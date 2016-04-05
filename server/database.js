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


  this.findUser = function(userId, cb) {
    var logins = db.collection('logins');

    logins.findOne({userId : userId}, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.createLogin = function(data, cb) {
    var logins = db.collection('logins');
    var userData = {
      userId : data.id,
      login : data.login,
      image : data.avatar_url,
      name : data.name,
      location : data.location
    };
    logins.findOne({userId : data.id}, function(err, data) {
      if (err) return cb(err);
      if (data === null) {
        logins.insert(userData, function(err, data) {
          if (err) return cb(err);
          cb(null, userData);
        })
      } else {
        cb(null, userData);
      }
    });
  };


return this;
}
