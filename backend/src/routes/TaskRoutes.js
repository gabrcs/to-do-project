/* Task routes with insomnia/MongoDB */
/*Gabriel Corrêa*/
const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');


router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);
router.put('/:id/:done', TaskController.done);

router.get('/:id',                          TaskController.show);
router.get('/filter/all/:macaddress',       TaskController.all);
router.get('/filter/late/:macaddress',      TaskController.late);
router.get('/filter/today/:macaddress',     TaskController.toDay);
router.get('/filter/toweek/:macaddress',    TaskController.toWeek);
router.get('/filter/tomonth/:macaddress',   TaskController.toMonth);
router.get('/filter/toyear/:macaddress',    TaskController.toYear);

router.delete('/:id', TaskController.delete);

module.exports = router;