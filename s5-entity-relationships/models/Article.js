var mongoose = require('mongoose');

//Setup s3: Configure the Article schema 
var ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  //Entity relationships s5: Create a reference to the author
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

//Setup s3: You can choose here what you want to be returned in the response
ArticleSchema.methods.toJSON = function(){
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

//Entity relationships s5: Before this article is removed, first remove it from the the user's articles
ArticleSchema.pre('remove', function (next) {
  var article = this;
  article.model('User').update(
    { articles: article._id },
    { $pull: { articles: article._id } },
    { multi: true },
    next);
});

//Setup s3: Create the Article model
mongoose.model('Article', ArticleSchema);