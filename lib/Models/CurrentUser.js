var mongoose = require('mongoose');
//get the module for the user model
var CurrentUser = mongoose.model('CurrentUser',{
            username: 'string',
            password: 'string',
            email: 'string',
            status: 'string'
});

module.exports = CurrentUser;
