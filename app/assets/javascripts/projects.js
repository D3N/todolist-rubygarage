// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery
//= require moment
//= require bootstrap-datetimepicker

window.onload = function() {

  var cb = document.getElementsByClassName('checkbox');

  doneLauncher = function(){
    fetch("/projects/"+this.id+"/tasks/"+this.value+"", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({project_id: this.id, id: this.value, status: "done"})
    })
    window.location = window.location;
  }

  undoneLauncher = function(){
    fetch("/projects/"+this.id+"/tasks/"+this.value+"", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({project_id: this.id, id: this.value, status: "undone"})
    })
    window.location = window.location;
  }


  for (var i = 0; i < cb.length; i++) {
    if (cb[i].checked) {
      cb[i].onclick = undoneLauncher
    }
    else {
      cb[i].onclick = doneLauncher
    }
  }

  var tasks = $('.one-task');

  for (var i = 0; i < tasks.length; i++) {
    tasks[i].onmouseover = function () {
      this.style.background = "#fdfdd9"
    }
    tasks[i].onmouseout = function () {
      this.style.background = "white"
    }
  }
}
