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
/*
function GovCoupon () {
    var localDiscountRate = 5,
        subsidy = 0,
        newBill = 0;
    client.coupon.create({
        startDate: new Date() - 100,
        description: "Local customer subsidy",
        maxRedemptions: new Date() + 1,
        couponCode: "local",
        endDate: new Date() + 100,
        percentOff: localDiscountRate
    }, function (errData, data) {
        if(errData){
            console.error("Error Message: " + errData.data.error.message);
            // handle the error
            return;
    } console.log("Success Response: " + JSON.stringify(data));
});
*/

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('public/index.html');
});

app.post('/vendorinfo/:zip', function (req, res) {
    vendorzip = req.params.zip;
});

app.post('/transaction/:amount/:description/:expMonth/:expYear/:cvc/:number/:currency', function (req, res, next) {
    if (true){
        var localDiscountRate = 0.05;
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
            currency: req.params.currency
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
                expMonth: req.params.expMonth,
                expYear: req.params.expYear,
                cvc: req.params.cvc,
                number: req.params.number
            },
            currency: req.params.currency
        }, function (errData, data) {
            if (errData) {
                console.error("Error message: " + errData.data.error.message);
                return;
            }
            console.log("Payment status: " + data.paymentStatus);
        });
        //some stuff
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
            currency: req.params.currency
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