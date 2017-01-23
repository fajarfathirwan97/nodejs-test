var express = require('express');
var router = express.Router();
var models = require('../../../models');
var app = express();
app.set('taskField', ['title','description','estimatedTime','startTime','finishTime','finished']);
app.set('projectField', ['name','id','description','finished']);
/* API FOR TASKS */
/* GET All Tasks. */
router.get('/tasks', function(req, res) {
  models.Task.all().then(function (resultOfTasks) {
    res.status(200);
    res.json(resultOfTasks);
  });
});

router.get('/task/:id', function(req, res) {
  var taskId = req.params.id;
  models.Task.findOne(
    {
      where : 
      {
        id : taskId
      },
      attributes: app.get('taskField'),
      include :
    [
      {
      model : models.Project,
      attributes : app.get('projectField')
      }
    ]
    }).then( function (resultOfFindTask) {
      res.json(resultOfFindTask);
  });
});

/* API FOR PROJECT */
/* GET All Projects. */
router.get('/projects', function(req, res) {
  models.Project.all().then(function (resultOfProjects) {
    res.status(200);
    res.json(resultOfProjects);
  });
});
  
  /*API RELATION FOR PROJECT & TASK*/
router.get('/task-of-project', function(req,res) {
  models.Task.all({
    include :
    [
      {
      model : models.Project,
      attributes : app.get('projectField')
      }
    ],
    attributes:  app.get('taskField')
   }).then(function (resultTaskOfProject) {
    res.status(200);
    res.json(resultTaskOfProject);
  });
});

module.exports = router;
