var assert = require('assert');
var fs = require('fs');
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var PORT = 3000;
var uniqueTestDB = Date();

app.use(express.static('html'));
app.use(express.static('css'));
//app.use(express.static('json'));

mongoose.connect('mongodb://localhost', PORT);
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
var one = new User({username:"Alice", password:"Lord", type:"super", email:"a"});
var two = new User({username:"Bob", password:"second", type:"admin", email:"b"});
var three = new User({username:"Eve", password:"Stalker", type:"user", email:"c"});

one.save();
two.save();
three.save();

console.log("Users added");
console.log("---");
// Test Code End

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


function addUser (name, pass, email) {
	console.log("addUser");
	var newUser = new User({username: name, password: pass, type:"user", email:"d"});
	newUser.save();

		
	
}

addUser("a", "b", "c");
listUsers();
app.listen(PORT);