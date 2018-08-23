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

// task "done" feature
  changeStatus = function(project_id, task_id) {
    fetch(
      "/projects/" + project_id + "/tasks/" + task_id,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST"
      }
    )
    .then(
      function(response) { updateUIstatusTask(response, task_id) }
    )
    .catch(
      function(error) { console.log(error) }
    )
  }

  updateUIstatusTask = function(response, task_id) {
    var cb = $('#' + task_id + '.task-name-field')
    if (response.status == 200 && cb[0]) {
      response.json().then(
        function(data) {
          switch(data.task.status) {
            case 'done':
              cb[0].classList.add('task-done');
              break;
            case 'undone':
              cb[0].classList.remove('task-done');
              break;
            default:
              break;
          }
        }
      )
    }
  }

// form for project's name
  editProject = function (project_id) {
    var textField = $('#' +  project_id + '.pr-edit')
    var noTextField = $('#' +  project_id + '.pr-name')
    noTextField[0].style.display = 'none'
    textField[0].style.display = 'inline'
  }

// edit project's name

  updateProjectName = function(project_id) {
    var name = $('#list' + project_id).val()
    fetch(
      "/projects/" + project_id + "/new_name",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({id:project_id, name: name})
      }
    )
    .then(
      function(response) { changeProjectName(response, project_id) }
    )
    .catch(
      function(error) { console.log(error) }
    )
  }

  changeProjectName = function(response, project_id) {
    var textField = $('#' +  project_id + '.pr-edit')
    var noTextField = $('#' +  project_id + '.pr-name')
    if (response.status == 200) {
      response.json().then(
        function(data) {
          $('#' +  project_id + '.pr-name').text(data.project.name)
          noTextField[0].style.display = 'inline'
          textField[0].style.display = 'none'
        }
      )
    }
  }

// task's backlighting
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
