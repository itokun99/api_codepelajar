var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var app = express();
var routes = require('./routes/route');

app.use('/static', express.static('static'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
routes(app);
app.listen(port, function(){
    console.log("Server start on : " + port);
});