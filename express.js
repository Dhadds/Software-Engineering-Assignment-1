var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
var SearchInformation = []
  
//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data); 
  }
});
 
//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //send tweet info
  res.send({tweetinfo: tweetinfo});
}); 

//Shows searched tweets
app.get('/SearchInformation', function(req, res){
  res.send({SearchInformation: SearchInformation});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //create a tweet.
  var newid = req.body.id; 
  var newtext = req.body.text;

  tweetinfo.push( { 
    id: newid,
    text: newtext,
    created_at: new Date().toString(),
  });
  res.send({tweetinfo: tweetinfo});

});


//Posts searched tweets
app.post('/SearchInformation', function(req, res) {
  //search a tweet
  var id = req.body.id;
  tweetinfo.forEach(function(tweet, index) { 
    if (tweet.id_str === id) { 
      SearchInformation.push(tweet);
    }
  });
  res.send("Successfully updated product"); 
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //update tweets
  
  var nm = req.params.nm;
  var newName = req.body.name;
  tweetinfo.forEach(function(tweet, index) { 
    if (tweet.user.name === nm) { 
      tweet.user.screen_name = newName; 
    }
  });
  res.send({tweetinfo: tweetinfo});
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //delete a tweet
  var id = req.params.tweetid; 
  tweetinfo.forEach(function(tweet, index) { 
    if (tweet.id_str === id) {
      tweetinfo.splice(index, 1); 
    }
  });
  res.send({tweetinfo: tweetinfo});
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});