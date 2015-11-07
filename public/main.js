$(document).ready(function(){

$(function (){
  
  var $number = $('#cc-number');
  var $cvc = $('#cc-cvc');
  var $expMonth = $('#cc-exp-month');
  var $expYear = $('#cc-exp-year');

  
  $('#process-payment-btn').on('click', funtion() {
    var info = {
      cc-number: $cc-number.val(),
      cc-cvc: $cc-cvc.val(),
      cc-exp-month: $cc-exp-month.val(),
      cc-exp-year: $cc-exp-year.val(),
      };
      
    $.ajax({
      type: 'POST',
      url: 'https://serene-inlet-7047.herokuapp.com/transaction/:amount/:description/:expMonth/:expYear/:cvc/:number/:currency',
      data: info,
      });
  });
  
});
