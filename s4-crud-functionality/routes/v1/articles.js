const router = require("express").Router();
const _ = require("lodash");
const mongoose = require('mongoose');
//CRUD s4: Get instance of Article model
const Article = mongoose.model("Article");

// Preload Article objects on routes with ':article'
router.param("article", function(req, res, next, id) {
  //CRUD s4: Get an article from the database by ID and put it in the request object
  Article.findById(id)
    .then(function(article) {
      if (!article) {
        return res.sendStatus(404);
      }
      req.article = article;
      return next();
    })
    .catch(next);
});

/**
 * Get all Articles.
 * GET /v1/articles
 */
router.get("/", function(req, res, next) {
  //CRUD s4: Get all articles from the database
  Article.find({})
    .sort({ createdAt: "desc" })
    .then(function(articles) {
      return res.json({
        articles: articles.map(function(article) {
          return article.toJSON();
        })
      });
    });
});

//***************************************************
//* For paginated results, use the following instead
//**************************************************/

// router.get("/", function(req, res, next) {
//   //CRUD s4: Find out if the request has parameters of "limit" and "offset" which are used for pagination
//   var query = {};
//   var limit = 20;
//   var offset = 0;

//   if(typeof req.query.limit !== 'undefined'){
//     limit = req.query.limit;
//   }

//   if(typeof req.query.offset !== 'undefined'){
//     offset = req.query.offset;
//   }
//    //CRUD s4: Get all articles from the database from a particular offset and up to a specified limit
//     return Promise.all([
//       Article.find(query)
//         .limit(Number(limit))
//         .skip(Number(offset))
//         .sort({createdAt: 'desc'})
//         .exec(),
//       Article.countDocuments(query).exec()
//     ]).then(function(results){
//       var articles = results[0];
//       var articlesCount = results[1];

//       return res.json({
//         articles: articles.map(function(article){
//           return article.toJSON();
//         }),
//         articlesCount: articlesCount
//       });
//    });
// });

/**
 * Get an Article by ID.
 * GET /v1/articles/:articleId
 */
router.get("/:article", function(req, res, next) {
  //CRUD s4: Return the article from the request object (it was already retrieved 
  //from the database by the router.param middleware at the top of this file)
  return res.json({article: req.article.toJSON()});
});

/**
 * Add a new Article.
 * POST /v1/articles
 */
router.post("/", function(req, res, next) {
  //CRUD s4: Save a new article to the database using the values passed through the request body
  var article = new Article(req.body);
    return article.save().then(function(){
      return res.json({article: article.toJSON()});
    });
});

/**
 * Update an Article.
 * PUT /v1/articles/:articleId
 */
router.put("/:article", function(req, res, next) {
  
  //Using a JS library like Lodash can make the above a lot cleaner
  req.article = _.extend(req.article, req.body);

  //CRUD s4: Update an existing article with the values passed through the request body and save it to the database 
  req.article.save().then(function(article){
    return res.json({article: article.toJSON()});
  }).catch(next);
});

/**
 * Delete an Article.
 * DELETE /v1/articles/:articleId
 */

router.delete("/:article", function(req, res, next) {
  //CRUD s4: Delete the article and return a 204 status code
  return Article.findByIdAndRemove(req.article.id).then(function(){
    return res.sendStatus(204);
  });
});

module.exports = router;
