
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

app.get("/blogs/new", function(req, res){
  res.render("new.ejs");
});

app.post('/blogs', function(req, res){
  Blog.create(req.body.blog, function(err, newBlog){
    if(err) {
      res.render("new.ejs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err) {
      res.redirect('/blogs');
    } else {
      res.render("show.ejs", {blog: foundBlog});
    }
  })
});



console.log("is this thing on?");
var port = 5000;
app.listen(port, function() {
  console.log("listening on " + port);
});