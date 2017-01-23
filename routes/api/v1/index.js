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
    if(resultOfTasks == null){
      resultOfTasks = [];
    }
    res.json({code:200,message:"Success Get Data",data : resultOfTasks});
  });
});

/* POST Task OR PUT if id exist. */
router.post('/task',function(req, res) {
  var inputTask = req.body;
  if (inputTask.id == undefined){
  models.Task.create(inputTask).then(function (resultOfTaskPost){
      res.status(200);
      res.json({code:200 ,message : "Task Is Added Succesfully with Id : " + resultOfTaskPost.id});
    });
  }else{
    models.Task.update(
      {
        title : inputTask.title,
        description : inputTask.description,
        startTime : inputTask.startTime,
        estimatedTime : inputTask.estimatedTime,
        finishTime : inputTask.finishTime,
        finished : inputTask.finished,
        projectId : inputTask.projectId
      },
      {
         where:
          {
           id : inputTask.id
          }
      }).then(function (resultOfTaskPost) {
      res.status(200);
      res.json({code:200 ,message : "Task is Updated Succesfully, Num of Row(s) Affected is : " + resultOfTaskPost } );
    });
  }
});

router.delete('/task/:id',function(req,res) {
  var taskId = req.params.id;
  models.Task.destroy({where: {id : taskId}}).then(function(destroyedTask){
    console.log (destroyedTask);
    res.status(200);
    res.json({code:200 , message :"Task is Deleted Succesfully, Num of Row(s) Affected is :" + destroyedTask });
  }).catch(function(err){
    console.log(err);
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
      if(resultOfFindTask == null){
          resultOfFindTask = [];
      }
      res.json({code : 200 , data : resultOfFindTask});
  }).catch( function(err){
      console.log('error');    
      res.json(err);
  });
});

/* API FOR PROJECT */
/* GET All Projects. */
router.get('/projects', function(req, res) {
  models.Project.all().then(function (resultOfProjects) {
    res.status(200);
    res.json(resultOfProjects);
    if(resultOfProjects == null){
      resultOfProjects = [];
    }
    res.json({code:200,message:"Success Get Data",data : resultOfProjects});
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
    if(resultTaskOfProject == null){
      resultTaskOfProject = [];
    }
    res.json({code:200,message:"Success Get Data",data : resultTaskOfProject});
  });
});

module.exports = router;
