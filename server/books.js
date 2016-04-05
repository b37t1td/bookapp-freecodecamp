var books = require('google-books-search');

var options = {
    key: process.env.GOOGLE_KEY,
    field: 'title',
    offset: 0,
    limit: 10,
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
}
