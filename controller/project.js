var express = require('express');
var app = express();
app.set('taskField', ['title', 'description', 'estimatedTime', 'startTime', 'finishTime', 'finished']);
app.set('userField', ['firstName', 'lastName']);

var project = {
  /**
   * Get Projects from database
   * @author Fajar Fathirwan Atthariq
   * @return array response object
   */
  getProjects: function (response) {
    global.models.Project.all().then(function (result) {
      response({ code: 200, data: result });
    }).catch(function (error) {
      response({ code: 500, data: error.toString() });
    })
  },
  /**
   * Insert Into Projects Table
   * @param input property
   * @author Fajar Fathirwan Atthariq
   * @return array
   */
  createProject: function (input, response) {
    global.models.Project.create(input).then(function (resultPost) {
      response({ code: 200, data: resultPost });
    }).catch(function (error) {
      console.log(error);
      response({code : 422 , data: error.toString()});
    })
  },
  /**
   * Update Project based on id
   * @param input property
   * @author Fajar Fathirwan
   * @return array
   */
  updateProject : function (input,response){
    global.models.Project.update(input.body,{where:{id:input.id}}).then(function (resultUpdate){
      response({code:200,data:'Number Of Updated Row: '+resultUpdate})
    }).catch(function (error){
      response({code:422,data:error.toString()})
    })
  },
  destroyProject : function(id,response){
    global.models.Project.destroy({where: {id : id}}).then(function (resultDelete){
      response({code : 200,data:'Number Of Deleted Row : '+resultDelete})
    }).catch(function (error){
      response({code:422,data:error.toString()})
    })
  }
};
module.exports = project;