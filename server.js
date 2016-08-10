var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes');
app.use(bodyParser.urlencoded({ extended: true}));
var path = require('path');

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');




var UserSchema = new mongoose.Schema({
	name: {type: String, required:true, minlength:4},
	quote: {type: String, required:true, minlength:1}
	}, {timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'

var User = mongoose.model('User') 

app.get('/', function(req,res){

	res.render('index')
})

app.get('/quotes', function(req,res){
		var user = User.find({}, function(err, users){
		console.log('********************************')
		console.log(users);
		console.log('********************************')
	res.render('quotes', { users: users });
	})
})

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, quote: req.body.quote});

    user.save(function(err){

    	if(err){
    		console.log("Something went wrong")
    	} else{
    		console.log("Successfully saved a new user!");
    		
   			res.redirect('/quotes');
    	}
    })

    // This is where we would add the user from req.body to the database.
})


app.listen(8000, function() {
    console.log("listening on port 8000");
});
