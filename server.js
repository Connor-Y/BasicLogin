var assert = require('assert');
var fs = require('fs'); // TODO: might not need these

var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var PORT = 3000;

var testNum = "test8";
var uniqueTestDB = testNum;

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(session({secret: '228974482',
	resave: false,
	saveUninitialized: true
	}));
var sess;

app.use(express.static('javascript'));
app.use(express.static('html'));
app.use(express.static('css'));

app.use(bodyParser.json());

// TODO: Store currentUser Send info back to client? (REST)
app.post("/loginVerification", function (req, res) {
	console.log("Login Request Received");
	User.findOne({ "email": req.body.mail }, 
	function (err, user) {
		if (err) {
			console.log("verifyLogin Error " + err);
			res.send("An Error Has Occurred, Please Try Again"); 
		}
		if (user == undefined)
			return false;
		if (req.body.pass === user.password) { 
			console.log("Valid Login");
			sess=req.session;
			sess.email = req.body.mail;
			sess.type = user.type;
			res.send("Success");
		}
		else {
			console.log("Invalid Login");
			res.send("Invalid Login"); 
		}
		
	});
});


app.post("/loadTable", function (req, res) {
	console.log("Load Table");
	User.find( function (err, users) {
		if (err) {
			console.log("Load Table Error");
		} else {
			res.send(users);
		}
	});
});
			
			
			
app.post("/registration", function (req, res) {
	console.log("Registration Request Received");
	User.findOne({ email: req.body.mail }, function (err, user) {
		if (err) {
			console.log(err);
			res.send("Error");
		}
		if (user == undefined) {
			console.log("New User");
			var newUser = new User({username: req.body.mail, password: req.body.pass, type:"user", email:req.body.mail, image: "default.png", desc: ""});
			newUser.save();
			res.send("Success");
		}
		else {
			console.log("User already exists");
			res.send("User Exists");
		}
	});
});

app.post("/profile", function (req, res) {
	console.log("Profile Request Received");
	User.findOne({ email: req.body.mail }, function (err, user) {
		if (err) {
			console.log(err);
			res.send("Error");
		}
		if (user == undefined) {
			console.log("User doesn't exist error");
			res.send("Error");
		} else {
			console.log("Success");
			user.sessMail = sess.email;
			user.sessType = sess.type;
			res.send(user);
		}		
	});
});

app.post("saveProfile", function (req, res) {
	
	
});

app.get("*", function (req, res) {
	res.redirect('/');	
});

app.listen(PORT);


// Database code below

mongoose.connect('mongodb://localhost/DB', PORT);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error:"));
db.once('open', function (callback) {
console.log.bind("Database Loaded"); });
	
var userSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	type: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	image: String,
	desc: String,
	sessMail: String,
	sessType: String
});
console.log("Schema built");

userSchema.methods.getData = function () {
	var data = "Username: " + this.username + " | Usertype: " + this.type;
	console.log(data);
}

console.log("Methods Added");

var User = mongoose.model('User', userSchema, uniqueTestDB);
console.log("Model Created");

// Test Code - Db insertion
function initDB () {
	var one = new User({username:"Alice", password:"Lord", type:"super", email:"a", image: "default.png", desc:""});
	var two = new User({username:"Bob", password:"second", type:"admin", email:"b", image: "default.png", desc:""});
	var three = new User({username:"Eve", password:"Stalker", type:"user", email:"c", image: "default.png", desc:""});

	one.save();
	two.save();
	three.save();

	console.log("Users added");
	console.log("---");	
} // Test Code End

function listUsers () {
	User.find(function (err, users) {
		console.log("User List:");
		if (err) 
			return console.error(err);
		else
			console.log(users);
		console.log("===");
	});
}


function userUpdate (currentUser, target, field, newInfo) {
	console.log("User Update");
	if (currentUser == undefined || currentUser != target || field == 'email' || field == 'type')
		return false;
	var updatedField = {};
	updatedField[field] = newInfo;
	var query = { email: target };
	User.findOneAndUpdate(query, { $set: updatedField },
	function (err, user) {
		if (err) {
			console.bind.error(err);
			return false;
		}
		user.save();
	});		
}

// currentUser currently is just a String, how to get user object
// TODO: ^
function adminUpdate (currentUser, target, field, newInfo) {
	console.log("Admin Update");
	if (currentUser == undefined || currentUser.type != 'admin' || field == 'type')
		return false;
	console.log("query");
	var query = { email: target };
	if (field == 'email') {
		User.findOneAndUpdate(query, { $set: {email: newInfo} },
		function (err, user) {
			if (err) {
				console.bind.error(err);
				return false;
			}
			user.save();
		});
	}
	else
		userUpdate(target, target, field, newInfo);
}

function superUpdate(currentUser, target, field, newInfo) {
	if (currentUser == undefined || currentUser.type != 'super')
		return false;
	var query = { email: target };
	if (field == 'type') {
		User.findOneAndUpdate(query, { $set: {type: newInfo} },
		function (err, user) {
			if (err) {
				console.bind.error(err);
				return false;
			}
			user.save();
		});
	}
	else
		adminUpdate(currentUser, target, field, newInfo);
}
// Doesn't work
function findUser (mail) {
	var temp = User.find({ email: mail }, 
	function (err, user) {
		return user;
	});
}

//initDB();


//userUpdate('d', 'd', 'image', "Roasted");
//adminUpdate('b', 'd', 'image', "Trolled");

//setTimeout(listUsers, 2000);

