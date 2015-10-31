var assert = require('assert');
var fs = require('fs');
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');


app.use(express.static('html'));
app.use(express.static('css'));
//app.use(express.static('json'));

mongoose.connect('mongodb://localhost/userDb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error:"));
db.once('open', function (callback) {
	console.log("DB open");
	var userSchema = mongoose.Schema({
		username: String,
		password: String,
		type: String
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
	
	var User = mongoose.model('User', userSchema);
	console.log("Model Created");
	
	// Test Code - Db insertion
	var one = new User({username:"Alice", password:"Lord", type:"super"});
	var two = new User({username:"Bob", password:"second", type:"admin"});
	var three = new User({username:"Eve", password:"Stalker", type:"user"});
	console.log("Users added");

	//one.save();
	
	console.log("---");
	User.find(function (err, users) {
		if (err) 
			return console.error(err);
		else
			console.log(users);
	});
	// Test Code End
	
	
	
});


app.listen(3000);