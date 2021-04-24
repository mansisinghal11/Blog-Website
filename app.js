//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Welcome to my Blog page! I am glad that you are here and I hope you like my content. It's not the best but it's unique and the best of what I can do. So enjoy while you are still here :)";
const aboutContent = "A Btech undergrad who loves few things more than a good hug :) . I love writing and I am always ready to hop on a flight to a peaceful place where I can sit with a beautiful scenery full of serenity and put my thoughts on a paper (well not exactlty on a paper, I am from a tech background afterall!). Well! I also am a Developer, occasional designer, an artist, home chef and a bathroom singer, and trust me the list is pretty long.";
const contactContent = "Well! You can contact me at : ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mansi:mansiji2001@cluster0.jpuhx.mongodb.net/BlogDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
 title: String,
 content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req,res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });

});

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose", {contactContent: contactContent});
});

app.post("/compose", function(req,res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
});

app.get("/posts/:postId", function(req,res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
   res.render("post", {
     title: post.title,
     content: post.content
   });
 });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
