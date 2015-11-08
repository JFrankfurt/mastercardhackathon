$(document).ready(function(){
  
  var $number = $('#cc-number');
  var $cvc = $('#cc-cvc');
  var $expMonth = $('#cc-exp-month');
  var $expYear = $('#cc-exp-year');
  var $amount = $('#cc-amount-of-payment');
  var $yourzip = $('#')

  $('#process-payment-btn').on('click', function() {
    
    var info = {
      amount: $amountofpayment.val(),
      number: $cc-number.val(),
      cvc: $cc-cvc.val(),
      expMonth: $cc-exp-month.val(),
      expYear: $cc-exp-year.val(),
      };
      
    $.ajax({
      type: 'POST',
      url: 'https://localeconomics.herokuapp.com/transaction/:amount/:description/:expMonth/:expYear/:cvc/:number/:currency',
      data: info,
    });
  });
});
