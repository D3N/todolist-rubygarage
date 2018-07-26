// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery
//= require moment
//= require bootstrap-datetimepicker

$(document).ready(function () {
  $('#datetimepicker1').datetimepicker();
  $(".reset").click(function() {
    $('.deadline-form').find("input[type=text], textarea").val("");
  });
});
