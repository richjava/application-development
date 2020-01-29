var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Article = mongoose.model('Article');

// Preload User objects on routes with ':user'
router.param('user', function(req, res, next, id) {
  User.findById(id)
    .then(function (user) {
      if (!user) { return res.sendStatus(404); }

      req.user = user;

      return next();
    }).catch(next);
});

/**
* Get all Users. 
* GET /v1/users
*/
router.get('/', function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

    return Promise.all([
      User.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .exec(),
      User.countDocuments(query).exec()
    ]).then(function(results){
      var users = results[0];
      var usersCount = results[1];

      return res.json({
        users: users.map(function(user){
          return user.toJSON();
        }),
        usersCount: usersCount
      });
   });

});

/**
* Get a User by ID. 
* GET /v1/users/:userId
*/
router.get('/:user', async function (req, res, next) {
  // Entity relationships s5: Populate a user's collection of articles
  await req.user.populate('articles').execPopulate();
  return res.json({ user: req.user.toJSON() });
});

/**
* Add a new User. 
* POST /v1/users
*/
router.post('/', function(req, res, next) {
     var user = new User(req.body);
     user.displayName = user.firstName + " " + user.lastName;
    return user.save().then(function(){
      return res.json({user: user.toJSON()});
    });
});

/**
* Update a User. 
* PUT /v1/users/:userId
*/
router.put('/:user', function(req, res, next) {
      if(typeof req.body.firstName !== 'undefined'){
        req.user.firstName = req.body.firstName;
      }

      if(typeof req.body.lastName !== 'undefined'){
        req.user.lastName = req.body.lastName;
      }

      req.user.displayName = req.user.firstName + ' ' + req.user.lastName;

      if(typeof req.body.email !== 'undefined'){
        req.user.email = req.body.email;
      }

      req.user.save().then(function(user){
        return res.json({user: user.toJSON()});
      }).catch(next);
});

/**
* Delete a User. 
* /v1/users/:userId
*/ 
router.delete('/:user', function(req, res, next) {
      return User.deleteOne({ id: req.user.id }).then(function(){
        return res.sendStatus(204);
      });
});

/***************************
* Entity relationships s5: A User's Articles
***************************/

/**
 * Get a user's articles. 
 * /v1/users/:user/articles
 */
router.get("/:user/articles", function (req, res, next) {
  var limit = 20;
  var offset = 0;
  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset;
  }

    Promise.all([
      Article.find({ author: req.user }) 
        .limit(Number(limit))
        .sort({ createdAt: "desc" })
        .skip(Number(offset))
        .exec(),
      Article.countDocuments()
    ])
      .then(function (results) {
        var articles = results[0];
        var articlesCount = results[1];
        
        return res.json({
        articles: articles.map(function(article){
          return article.toJSON();
        }),
        articlesCount: articlesCount
      });
  });
});

/**
 * Add a new article to a user's collection. 
 * /v1/users/:user/articles
 */
router.post('/:user/articles', function (req, res, next) {
      var article = new Article(req.body);
      article.author = req.user;
      return article.save().then(function () {
        if (!req.user.articles) {
          req.user.articles = [];
        }
        req.user.articles.push(article);
        return req.user.save().then(function () {
          return res.json({ article: article.toJSON() });
        });
      });
});

module.exports = router;
