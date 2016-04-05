

module.exports = function(app, db) {

  app.get('/api/users/current', function(req, res) {
    var userId = req.session.user ? req.session.user.userId : null;

    if (!userId) {
      res.send(JSON.stringify({}), 404).end;
    } else {
      res.send(JSON.stringify(req.session.user.userId)).end();
    }
  });

}
