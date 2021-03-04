/* Task Controller */
/*Gabriel Corrêa*/
const TaskModel = require('../model/TaskModel');

const current = new Date();
const { startOfDay, endOfDay, 
        startOfWeek, endOfWeek,
        startOfMonth, endOfMonth,
        startOfYear, endOfYear } = require('date-fns');

class TaskController{
    /* fuction to create a task */
    async create(req, res){
        const task = new TaskModel(req.body);
            await task
                .save()
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                   return res.status(500).json(error);
                });
    }
    /* fuction to update a task */
    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }
    /* fuction to filter a task */
    async all(req, res){
        await TaskModel.find({ macaddress: {'$in': req.params.macadress }})
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    /* fuction to show a task by id*/
    async show(req, res){
        await TaskModel.findById(req.params.id)
            .then(response => {
                if(response)
                return res.status(200).json(response);
                else
                return res.status(404).json({ error: 'tarefa não encontrada'});            
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }
    /* fuction to delete a task by id*/
    async delete(req, res){
        await TaskModel.deleteOne({ '_id': req.params.ids })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }
    /* fuction to complet task*/
    async done(req, res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    /* fuction to show all task late */
    async late(req, res){
        await TaskModel
            .find({
                'when': {'$lt': current},
                'macaddress': {'$in': req.params.macaddress}
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    /* fuction to show all task to current day */
    async toDay(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': { '$gte': startOfDay(current), '$lte': endOfDay(current)} 
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    /* fuction to show all task to current week*/
    async toWeek(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current)} 
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    /* fuction to show all task to current month*/
    async toMonth(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current)} 
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    /* fuction to show all task to current year*/
    async toYear(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': { '$gte': startOfYear(current), '$lte': endOfYear(current)} 
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
    
}

module.exports = new TaskController();