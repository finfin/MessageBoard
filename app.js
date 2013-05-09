/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use('/public', express.static(__dirname + '/public'));
});

// Routes

app.get('/', function(req, res) {
  var title = 'Switter',
      header = 'Welcome to Switter';

  res.render('index', {
    'title': title,
    'header': header,
    'tweets': tweets,
  })
})

var tweets = [];

app.get('/tweets', function(req,res) {
  res.send(tweets);
})

app.post('/send', express.bodyParser(), function(req, res) {
  if (req.body && req.body.tweet) {
    tweets.push(req.body.tweet);
    if(acceptsHtml(req.headers['accept'])) { 
      res.redirect('/', 302)
    } else {
      res.send({status:"ok", message:"Tweet received"});
    };
  } else {         //no tweet? 
    res.send({status:"nok", message:"No tweet received"});
  };
});

app.listen(8000);

function acceptsHtml(header) {     var accepts = header.split(',');
    for(i=0; i < accepts.length; i++) {
        if (accepts[i] === 'text/html') { return true; }; 
    }
    return false; 
}