//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my Blog page! I am glad that you are here and I hope you like my content. It's not the best by it's unique and the best of what I can do. So enjoy while you are still here :)";
const aboutContent = "A Btech undergrad who loves few things more than a good hug :) . I love writing and I am always ready to hop on a flight to a peaceful place where I can sit with a beautiful scenery full of serenity and put my thoughts on a paper (well not exactlty on a paper, I am from a tech background afterall!). Well! I also am a Developer, occasional designer, an artist, home chef and a bathroom singer, and trust me the list is pretty long.";
const contactContent = "Well! You can contact me at : ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts =[];

app.get("/", function(req,res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
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
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      }
      });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
