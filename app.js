
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var Blog = require('./models/blog');

mongoose.connect("mongodb://localhost/restful_blog_app");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we have database blogs connected');
});

Blog.create({
  title: "having a cocoa with Jeanine",
  image: "https://images.unsplash.com/photo-1422913687378-69480576789e?dpr=1&auto=compress,format&fit=crop&w=1587&h=&q=80&cs=tinysrgb&crop=",
  body: "Coldsmoke on a beautiful Sunday morning"

})

app.set('view engine', "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err) {
      console.log('error');
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

app.get('/', function(req, res){
  res.redirect("/blogs");
});



console.log("is this thing on?");
var port = 5000;
app.listen(port, function() {
  console.log("listening on " + port);
});