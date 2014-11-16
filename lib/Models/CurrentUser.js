var mongoose = require('mongoose');
//get the module for the user model

module.exports = mongoose.model('CurrentUser',{
            username: String,
            password: String
});
