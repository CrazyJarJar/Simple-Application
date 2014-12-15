var SimpleDb = require('simple-node-db');
var db = new SimpleDb();

// create a file based database
db = new SimpleDb('./mydb');

// create a database with options
var options = {
    path:'/lib/mydb',
    log:new Logger('db'),
    readAfterChange:true // read-back record after insert/update; else return model
};

db = new SimpleDb( options );

// the version and lastUpdated attributes are automatically updated
var usertest = {
    name:'CrazyJarJar',
    password:'JarJar',
    email:'Crazy@JarJar.com'
};
// key is created for the 'user' domain
var keytest = db.createDomainKey( 'user', usertest.id )

var test = function(err, modeltest) {
    if (err) throw err;
    assert modeltest.status = 'active';
};
// model must have an 'id' attribute
db.insert( keytest, modeltest, test );


function addUser(username, pass, Email){
// key is created for the 'user' domain
var key = db.createDomainKey( 'user', user.id );

var user = {
    name:username,
    password:pass,
    email:Email
};
var check = function(err){
  if(err) throw err;

  var callback = function(err, model) {
      if (err) throw err;
      assert model.status = 'active';
  };
  // model must have an 'id' attribute
  db.insert( key, model, callback );
}
db.find(key, check);
}
//load new information on db
function addUsers(filepath){
  var callback = function(err, Readfile){
    if(err) throw err;
    assert Readfile > 0;
  };
  db.restore(filepath, callback);
}
//export the users
function ExportUsers(dstdb){
  var callback = function(err, Readfile){
    if(err) throw err;
    assert Readfile > 0;
  };
  db.backup(dstdb, callback);
}

function authenticate(name, pass){
  var callback = function(err, model){
    if (err) return console.log('user does not exist');
    if(model.password==data) return console.log('Connecté');
    else {throw new Error('cant find login');}
  };
  db.find(name, callback);

}

function deleteUser(name){
  var callback = function(err){
    if(err) console.log('cannot find user');
  };
  db.delete(key, callback);
}

module.exports = db;
