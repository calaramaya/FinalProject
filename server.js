var express = require('express');

var app = express();

app.get('/',function(req,res){
	
	res.send('What do I do with this shit!!??');

});

app.listen(3003,function(){
	console.log('App listening on port 3003!');
});

app.use('/public', express.static(__dirname + '/public'));
