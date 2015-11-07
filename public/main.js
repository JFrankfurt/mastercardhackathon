$(document).ready(function(){

$(function (){
  
  var $number = $('#cc-number');
  var $cvc = $('#cc-cvc');
  var $expMonth = $('#cc-exp-month');
  var $expYear = $('#cc-exp-year');
  var $amount = $('#cc-amount-of-payment');

  
  $('#process-payment-btn').on('click', funtion() {
    var info = {
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
