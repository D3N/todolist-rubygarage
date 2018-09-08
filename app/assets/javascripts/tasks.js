// # Place all the behaviors and hooks rela
// ted to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery
//= require moment
//= require bootstrap-datetimepicker

$(document).ready(function () {

// form for task's name

  editTask = function (task_id) {
    var taskName = $('#' +  task_id + '.task-name-field')
    var deadLine = $('#' +  task_id + '.deadnum')
    var taskFormField = $('#' +  task_id + '.tk-edit')

    taskName[0].style.display = 'none'
    deadLine[0].style.display = 'none'
    taskFormField[0].style.display = 'inline'
  }

// edit task's name

  updateTaskName = function(project_id, task_id) {
    var taskName = $('#task_new_name' + task_id).val()
    var taskDeadLine = $('#task_dead_line' + task_id).val()
    fetch(
      "/projects/" + project_id + "/tasks/" + task_id + "/edit_task",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({id: task_id, name: taskName, deadline: taskDeadLine})
      }
    )
    .then(
      function(response) { changeTaskName(response, task_id) }
    )
    .catch(
      function(error) { console.log(error) }
    )
  }

  changeTaskName = function(response, task_id) {
    var taskFormField = $('#' +  task_id + '.tk-edit')
    var taskName = $('#' +  task_id + '.task-name-field')
    var deadLine = $('#' +  task_id + '.deadnum')
    if (response.status == 200) {
      response.json().then(
        function(data) {
          taskName.text(data.task.name)
          deadLine.text(data.task.deadline)
          taskName[0].style.display = 'inline'
          deadLine[0].style.display = 'inline'
          taskFormField[0].style.display = 'none'
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

// deadline calendar
  $(function () {
    $('.input-group.date').datetimepicker()
    // $('#reset').click(function() {
    //   $('.deadline-form').find("input[type=text], textarea").val("");
    // });
  });

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
});
