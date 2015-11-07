/**
 * Created by Jordan on 11/7/2015.
 */
var express = require('express'),
    app = express();

app.get('/', function (req, res){
    res.send('Hello, World!');
});
