const router = require("express").Router();
const _ = require("lodash");

const mockDb = [
  {
    title: "My test article",
    description: "Description for my test article",
    body: "Body for my test article"
  }
];

// Preload Article objects on routes with ':article'
router.param("article", function(req, res, next, id) {
  //Here we would normally get the article by id from the database. For now we'll use a mock db.
  let article = mockDb[0];
  //Add the article to the request object so we can access it in our handlers below
  req.article = article;
  // "next" is an Express middleware function that indicates we're finished and can move on to the next function call in
  // the middleware series, see https://expressjs.com/en/guide/using-middleware.html
  return next();
});

/**
 * Get all Articles.
 * GET /api/articles
 */
router.get("/", function(req, res, next) {
  var articles = mockDb;
  return res.json({
    articles: articles
  });
});

/**
 * Get an Article by ID.
 * GET /v1/articles/:articleId
 */
router.get("/:article", function(req, res, next) {
  console.log('getting article from db', req.article)
  return res.json({ article: req.article });
});

/**
 * Add a new Article.
 * POST /v1/articles
 */
router.post("/", function(req, res, next) {
  //Here we would normally create a new Article object from the data given to us by the user and insert it into our
  //database, but for now well just return it

  //Get the data from the body of the request
  var article = req.body;
  return res.json({ article: article });
});

/**
 * Update an Article.
 * PUT /v1/articles/:articleId
 */
router.put("/:article", function(req, res, next) {
  //NOTE - INTENTIONALLY COMMENTED OUT: assign values from the request body to the request article (from our mock db)

  // if (req.body.title) {
  //   req.article.title = req.body.title;
  // }

  // if (req.body.description) {
  //   req.article.description = req.body.description;
  // }

  // if (req.body.body) {
  //   req.article.body = req.body.body;
  // }

  //Using a JS library like Lodash can make the above a lot cleaner
  let article = _.extend(req.article, req.body);

  //We would normally save the article here, but for now we'll just return it in the request
  return res.json({ article: article });
});

/**
 * Delete an Article.
 * DELETE /v1/articles/:articleId
 */

router.delete("/:article", function(req, res, next) {
  //We would normally delete the article here, but for now we'll just return a 204 status code
  return res.sendStatus(204);
});

module.exports = router;
