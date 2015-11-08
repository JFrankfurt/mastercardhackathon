/**
 * Created by Jordan on 11/7/2015.
 */
var express = require('express'),
    app = express();

var Simplify = require('simplify-commerce'),
    client = Simplify.getClient({
        publicKey: 'sbpb_MTI2YmUwOTYtNDBjZi00ZTUxLTgxYzctMTIxZGEwMjc5OTEx',
        privateKey: 'wveDFv/Gi8MbNvlQozacvBShSLFw+TD+joMdJh2+hUd5YFFQL0ODSXAOkNtXTToq'
    });

var request = require('request'),
    queryString = require('querystring');

var placesURI = "http://dmartin.org:8026/merchantpoi/v1/merchantpoisvc.svc/merchantpoi?";

var vendorZip = 0,
    local = false,
    localDiscountRate = 0.1,
    subsidy = 0,
    newBill = 0;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('public/index.html');
});

app.post('/search/:PostalCode/:MerchName', function(req, res, next){
    var params = {
        PostalCode: req.params.PostalCode,
        MCCCode: '5814',
        MerchName: req.params.MerchName,
        Format: JSON
    };
    qs = queryString.stringify(params);
    final = placesURI + qs;
    request(final).on('response', function(response){
        res.json(response);
    });
});

app.post('/transaction/:amount/:description/:expMonth/:expYear/:cvc/:number/:currency', function (req, res, next) {
    if (local){
        subsidy = req.params.amount * localDiscountRate;
        newBill = req.params.amount - subsidy;

        client.payment.create({
            amount: newBill,
            desciption: "New bill to customer with local discount",
            card: {
                expMonth: req.params.expMonth,
                expYear: req.params.expYear,
                cvc: req.params.cvc,
                number: req.params.number
            },
            currency: "USD"
        }, function (errData, data) {
            if (errData) {
                console.error("Error message: " + errData.data.error.message);
                return;
            }
            console.log("Payment status: " + data.paymentStatus);
        });

        client.payment.create({
            amount: subsidy,
            desciption: "Payment from gov't to business for local discount.",
            card: {
                expMonth: "11",
                expYear: "19",
                cvc: "123",
                number: "5555555555554444"
            },
            currency: "USD"
        }, function (errData, data) {
            if (errData) {
                console.error("Error message: " + errData.data.error.message);
                return;
            }
            console.log("Payment status: " + data.paymentStatus);
        });
        next();
    } else {
        client.payment.create({
            amount: req.params.amount,
            desciption: req.params.description,
            card: {
                expMonth: req.params.expMonth,
                expYear: req.params.expYear,
                cvc: req.params.cvc,
                number: req.params.number
            },
            currency: "USD"
        }, function (errData, data) {
            if (errData) {
                console.error("Error message: " + errData.data.error.message);
                return;
            }
            console.log("Payment status: " + data.paymentStatus);
        });
        next();
    }
});

app.listen(app.get('port'), function () {
    console.log('App is up and running at: ', app.get('port'));
});