var mongoose = require('mongoose');

//Entity relationships s5: Configure the User schema 
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  displayName: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true
  }, 
  //Entity relationships s5: Create a reference to the articles
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
}, {timestamps: true});

UserSchema.methods.toJSON = function(){
  return {
    id: this._id,
    displayName: this.displayName,
    email: this.email,
    articles: this.articles
  };
};

//Entity relationships s5: Before this user is removed, first remove all the user's articles
UserSchema.pre('remove', function (next) {
  var user = this;
  user.model('Article').deleteOne({ author: this._id }).exec();
  next();
});

mongoose.model('User', UserSchema);