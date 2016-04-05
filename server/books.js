var books = require('google-books-search');

var options = {
    key: process.env.GOOGLE_KEY,
    field: 'title',
    offset: 0,
    limit: 5,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

module.exports = function(app,db) {
  app.get('/api/books/search/:term', function(req, res) {
    var term = decodeURIComponent(req.params.term);

    books.search(term, options, function(err, data) {
      if (err) return res.send({}).end();
      res.send(data).end();
    });
  });

  app.get('/api/books', function(req, res) {
    db.findBooks(function(err, data) {
      if (err) return res.status(500).end();
      res.send({ books : data }).end();
    });
  });


  app.delete('/api/books/:id', function(req, res) {
    var bookId = req.params.id;
    var userId = Number(req.session.user.id);

    db.findBook({id : bookId, userId : userId}, function(err, data) {
      if (err) return res.status(403).end();

      db.removeBook(data._id, function(err, d) {
        if (err) return res.status(500).end();
        res.send({}).end();
      });
    });
  });

  app.post('/api/books', function(req, res) {
    var book = req.body.book;
    book.userId = req.session.user.id;

    db.saveBook(book, function(err, d) {
      if (err) return res.status(500).end();
      res.send({});
    });
  });


  app.post('/api/books/trade/:id', function(req, res) {
    var data = {
      userId : req.session.user.id,
      id : req.params.id
    };

    db.tradeBook(data, function(err, d) {
      if (err) return res.status(500).end();
      res.send({}).end();
    })
  });

  app.put('/api/books/:id', function(req, res) {
    var book = req.body.book;
    book.id = req.params.id;
    book.userId = Number(req.session.user.id);

    db.saveBook(book, function(err, d) {
      if (err) return res.status(500).end();
      res.send({});
    });
  });
}
