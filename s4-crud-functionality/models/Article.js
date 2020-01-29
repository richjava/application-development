var mongoose = require('mongoose');

//Setup s3: Configure the Article schema 
var ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String
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

//Setup s3: Create the Article model
mongoose.model('Article', ArticleSchema);