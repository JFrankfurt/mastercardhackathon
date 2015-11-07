/**
 * Created by Jordan on 11/7/2015.
 */
var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('public/index.html');
});

app.listen(app.get('port'), function () {
    console.log('App is up and running at: ', app.get('port'));
});