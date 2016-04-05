

module.exports = function(app, db) {

  app.get('/api/users/current', function(req, res) {
    var userId = req.session.user ? req.session.user.id : null;

    if (!userId) {
      res.status(404).send(JSON.stringify({})).end;
    } else {
      res.send(JSON.stringify({user: req.session.user})).end();
    }
  });

  app.put('/api/users/:id', function(req, res) {

    if (!req.session.user || req.session.user.id != req.params.id) {
      return res.status(403).end();
    }

    db.findUser(Number(req.params.id), function(err, user) {
      if (err) return res.status(500).end();

      user.location = req.body.user.location;
      user.name = req.body.user.name;

      db.saveUser(user, function(err) {
        if (err) return res.status(500).end();

        req.session.user = user;
        res.send({}).end();
      });
    });

  });

}
