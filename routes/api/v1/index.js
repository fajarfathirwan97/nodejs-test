var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var app = express();
var projectController = require('../../../controller/project');
app.set('taskField', ['title', 'description', 'estimatedTime', 'startTime', 'finishTime', 'finished']);
app.set('projectField', ['name', 'id', 'description', 'finished']);
app.set('userField', ['firstName', 'lastName']);


/* API FOR TASKS */
/* GET All Tasks. */
router.get('/tasks', function (req, res) {
  global.global.models.Task.all().then(function (resultOfTasks) {
    res.status(200);
    if (resultOfTasks == null) {
      resultOfTasks = [];
    }
    res.json({ code: 200, message: "Success Get Data", data: resultOfTasks });
  });
});

/* POST Task OR PUT if id exist. */
router.post('/task', function (req, res) {
  var inputTask = req.body;

  if (inputTask.id == undefined) {
    global.models.Task.create(inputTask).then(function (resultOfTaskPost) {
      res.json({ code: 200, message: "Task Is Added Succesfully with Id : " + resultOfTaskPost.id });
    });
  } else {
    global.models.Task.update(
      {
        title: inputTask.title,
        description: inputTask.description,
        startTime: inputTask.startTime,
        estimatedTime: inputTask.estimatedTime,
        finishTime: inputTask.finishTime,
        finished: inputTask.finished,
        projectId: inputTask.projectId
      },
      {
        where:
        {
          id: inputTask.id
        }
      }).then(function (resultOfTaskPost) {
        res.status(200);
        res.json({ code: 200, message: "Task is Updated Succesfully, Num of Row(s) Affected is : " + resultOfTaskPost });
      });
  }
});
/* Delete All Task by Id. */
router.delete('/task/:id', function (req, res) {
  var taskId = req.params.id;
  global.models.Task.destroy({ where: { id: taskId } }).then(function (destroyedTask) {
    console.log(destroyedTask);
    res.status(200);
    res.json({ code: 200, message: "Task is Deleted Succesfully, Num of Row(s) Affected is :" + destroyedTask });
  }).catch(function (err) {
    console.log(err);
  });
});
/* GET Task By id. */
router.get('/task/:id', function (req, res) {
  var taskId = req.params.id;
  global.models.Task.findOne(
    {
      where:
      {
        id: taskId
      },
      attributes: app.get('taskField'),
      include:
      [
        {
          model: global.models.Project,
          attributes: app.get('projectField')
        }
      ]
    }).then(function (resultOfFindTask) {
      if (resultOfFindTask == null) {
        resultOfFindTask = [];
      }
      res.json({ code: 200, data: resultOfFindTask });
    }).catch(function (err) {
      console.log('error');
      res.json(err);
    });
});

/* API FOR PROJECT */
/**GET ALL PROJECTS API
 * URL :  /api/v1/projects
 * METHOD : GET
 */
router.get('/projects', function (req, res) {
  projectController.getProjects(function (result) {
    res.json(200, result)
  });
});

/**CREATE PROJECTS API
 * URL :  /api/v1/projects
 * METHOD : POST
 */
router.post('/projects', function (req, res) {
  var input = req.body;
  projectController.createProject(input, function (result) {
    res.json(result.code, result.data);
  });
});

/**UPDATE PROJECTS API
 * URL :  /api/v1/projects
 * METHOD : POST
 */
router.put('/project/:id', function (req, res) {
  var input = {};
  var input = Object.assign(input, { body: req.body, id: req.params.id });
  projectController.updateProject(input, function (result) {
    res.json(result.code, result.data);
  });
});

/**DELETE PROJECTS API
 * URL :  /api/v1/projects
 * METHOD : POST
 */
router.delete('/project/:id', function (req, res) {
  projectController.destroyProject(req.params.id, function (result) {
    res.json(result.code, result.data);
  });
});

/*API RELATION FOR PROJECT & TASK*/
router.get('/task-of-project', function (req, res) {
  global.models.Task.all({
    include:
    [
      {
        model: global.models.Project,
        attributes: app.get('projectField')
      }
    ],
    attributes: app.get('taskField')
  }).then(function (resultTaskOfProject) {
    res.json(resultTaskOfProject);
    if (resultTaskOfProject == null) {
      resultTaskOfProject = [];
    }
    res.json({ code: 200, message: "Success Get Data", data: resultTaskOfProject });
  });
});

/*API FOR USER*/
router.get('/user', function (req, res) {
  global.models.User.all({
    attributes: app.get('userField')
  }).then(function (resultOfUser) {
    res.json(200, { data: resultOfUser });
  }).catch(function (err) {
    console.log(err.toString())
  });
});

router.post('/user', function (req, res) {
  var inputUserForm = req.body;
  var salt = bcrypt.genSaltSync();
  inputUserForm.password = bcrypt.hashSync(inputUserForm.password, salt);
  return global.models.sequelize.transaction(function (t) {
    return global.models.User.create(inputUserForm).then(function (resultOfUserPost) {
      var input = { userId: resultOfUserPost.id, hash: salt }
      global.models.User.createHash(input)
    }, { transaction: t }).catch(function (err) {
      t.rollback();
      console.log(err.toString())
    }).then(function () {
      return res.json(200, { message: "Data Added Succesfully" })
    }).catch(function (err) {
      console.log(err.toString());
      return t.rollback()
    })
  })
})

module.exports = router;
