const express = require('express');

const Projects = require('../helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error: "Error loading your action"})
    })

})

router.get('/:id',(req, res) => {

    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else {
            Response.status(400).json({error: "ID can not be found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "ID does not exist"})
    })
} )


router.post('/', (req, res) => {

    const {notes, description} = req.body


    if (!notes, !description) {
        res.status(400).json({errorMessage: "Please provide notes and description for the post."})
    }
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        res.status(500).json({error: "Error adding post"})
    })
})


router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id) 
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(error => {
            res.status(500).json({error: "Post no longer exists"})
        })
    
})


router.put('./:id', (req, res) => {
    const {changes} = req.body
    if (!notes, !description) {
        res.status(400).json({errorMessage: "Please provide notes, description and project_id for the post."})
    } else if (!req.params.id) {
        res.status(404).json({message: "The post with the specified ID does not exist." })
    }
    Projectss.update(req,params.id, changes)
    .then(project => {
        res.status(201).json({project})
    })
    .catch(error => {
        res.status(500).json({error:"The post information could not be modified."})
    })
})






module.exports = router;