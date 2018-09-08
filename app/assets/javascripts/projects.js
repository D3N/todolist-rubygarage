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
}
