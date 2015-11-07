$(document).ready(function(){

$(function (){
  
  var $cc-number = $('#cc-number');
  var $cc-cvc = $('#cc-cvc');
  var $cc-exp-month = $('#cc-exp-month');
  var $cc-exp-year = $('#cc-exp-year');
});
  
  $('#process-payment-btn').on('click', funtion() {
    var info = {
      cc-number: $cc-number.val();
      cc-cvc: $cc-cvc.val();
      cc-exp-month: $cc-exp-month();
      cc-exp-year: $cc-exp-year();
      };
      
    $.ajax({
      type: 'POST',
      url: 'https://serene-inlet-7047.herokuapp.com/transaction/:amount/:description/:expMonth/:expYear/:cvc/:number/:currency',
      data: info,
      });
  });
  
});
