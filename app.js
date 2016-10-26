var express = require('express'),
    pug = require('pug'),
    fs = require ('fs'),
    app = express();

app.set('view engine', 'pug');

var movieData = JSON.parse(fs.readFileSync("data.json").toString())["movies"];

var bookData = JSON.parse(fs.readFileSync("data.json").toString())["books"];

function findMovie(slug) {
	for (var i = 0; i < movieData.length; i++) {
		if (movieData[i].slug === slug) {
			return movieData[i];
		}
	}
}

function findBook(slug) {
	for (var i = 0; i < bookData.length; i++) {
		if (bookData[i].slug === slug) {
			return bookData[i];
		}
	}
}

app.use(express.static('public'));

app.get('/', function(request, response) {
	response.redirect('/media');
});

app.get('/media', function(req, res) {
	console.log('Requesting /media');
	res.render('index.pug', { movies: movieData, books: bookData });
});

app.get('/books', function(req, res) {
  console.log('Requesting /books');
  res.render('views/index.pug', { books: bookData });
});

app.get('/books/*', function(req, res) {
  var foundBook = findBook(req.params[0]);
  res.render('views/book.pug', { book: foundBook });
});

app.get('/movies', function(req, res) {
	console.log('Requesting /movies');
	res.send(pug.renderFile('views/movies.pug', { movies: movieData }));
});

app.get('/movies/*', function(req, res) {
	var foundMovie = findMovie(req.params[0]);
	res.render('views/movie.pug', { movie: foundMovie });
});

app.listen(3001, function() {
  console.log('Web server is now running on port 3001');
});
