var assert = require('assert');
var fs = require('fs');
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var PORT = 3000;

var testNum = "test5";
var uniqueTestDB = testNum;

app.use(express.static('html'));
app.use(express.static('css'));

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
	desc: String
});
console.log("Schema built");

userSchema.methods.getData = function () {
	var data = "Username: " + this.username + " | Usertype: " + this.type;
	console.log(data);
}

userSchema.methods.checkLogin = function (name, pass) {
	if (this.username === name && this.password === pass)
		console.log("Valid User");
	else
		console.log("Invalid Login");
}

console.log("Methods Added");

var User = mongoose.model('User', userSchema, uniqueTestDB);
console.log("Model Created");

// Test Code - Db insertion
function initDB () {
	var one = new User({username:"Alice", password:"Lord", type:"super", email:"a"});
	var two = new User({username:"Bob", password:"second", type:"admin", email:"b"});
	var three = new User({username:"Eve", password:"Stalker", type:"user", email:"c"});

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


function addUser (name, pass, mail) {
	console.log("addUser");
	User.findOne({ email: mail }, function (err, user) {
		if (err)
			return err;
		if (user == undefined) {
			console.log("New User");
			var newUser = new User({username: name, password: pass, type:"user", email:mail});
			newUser.save();
		}
		else
			console.log("User already exists");
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

// currentUser currently is just a String, howto get user object
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
//addUser("Mark", "The Dark", "d");


//userUpdate('d', 'd', 'image', "Roasted");
//adminUpdate('b', 'd', 'image', "Trolled");

setTimeout(listUsers, 2000);

app.listen(PORT);