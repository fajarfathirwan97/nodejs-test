var express = require('express');
var app = express();
app.set('taskField', ['title', 'description', 'estimatedTime', 'startTime', 'finishTime', 'finished']);

var task = {
  /** GET ALL TASK
   * @returns collection
   * @author Fajar Fathirwan
   */
  getTasks: function (response) {
    global.models.task.all().then(function (result) {
      response({ code: 200, data: result })
    }).catch(function (error) {
      response({ code: 500, data: error.toString() })
    })
  },
  createTask: function (input,response) {
    global.models.task.create(input).then(function (result) {
      response({ code: 200, data: result })
    }).catch(function (error) {
      response({ code: 500, data: error.toString() })
    })
  },
  deleteTask : function(id,response){
    global.models.task
  }

}
module.exports = task;