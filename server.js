var express = require('express');
var exphbs  = require('express-handlebars');
var ipList  = require('./ipList');
var getEmptyIPs  = require('./index');

var app = new express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.get('/',function(req,res){
  var reactHtml = "<div>Meeting Room IP Address</div>";
  getEmptyIPs().then(function(ipSet){
     res.render('home',{ content : reactHtml ,ips : ipSet });
  })
});
app.get('/client',function(req,res){
     res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});