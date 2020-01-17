const express = require('express');

const Actions = require('../helpers/actionModel');
const router = express.Router();


router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error: "Error loading your action"})
    })

})

router.get('/:id',(req, res) => {

    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json(action)
        } else {
            Response.status(400).json({error: "ID can not be found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "ID does not exist"})
    })
} )


router.post('/', (req, res) => {

    const {project_id, notes, description} = req.body


    if (!project_id, !notes, !description) {
        res.status(400).json({errorMessage: "Please provide notes and description for the post."})
    }
    Actions.insert(req.body)
    .then(actions => {
        res.status(201).json(actions)
    })
    .catch(error => {
        res.status(500).json({error: "Error adding post"})
    })
})


router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id) 
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(error => {
            res.status(500).json({error: "Post no longer exists"})
        })
    
})

router.put('/:id', (req, res) => {
    const {project_id, notes, description} = req.body
    const changes = req.body

    if (!project_id || !notes || !description) {
        res.status(400).json({errorMessage: "Please provide notes, description and project_id for the post."})
    } else {
        Actions.update(req.params.id, changes)
        .then(actions => {
            if (actions) {
                res.status(201).json(actions)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist." })
            }   
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error:"The post information could not be modified."})
            
        })
    }
 
})







module.exports = router;