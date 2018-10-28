const Project = require('../model/project');
const router = require('express').Router();


router.post('/', (req,res) => {
    let data  = req.body;
    let newProject = new Project();
    let alias = data.name.toLowerCase().split(' ').join('-');
    newProject.name = data.name;
    newProject.alias = alias;
    newProject.githubUrl = data.githubUrl;
    newProject.description = data.description;
    newProject.relatedProjects = data.relatedProjects;
    newProject.tags = [];

    let tags = data.tags.trim();
    tags = tags.split(',');

    newProject.tags = tags.map((tag) => {
        return { name: tag, class :'info'}
    });

    newProject.save()
        .then((project) => {
            res.status(201).json({message:'Project created', data:project})
        }).catch(err => console.log(err));
});

router.get('/', async (req,res) => {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 0;
    let filter = {}
    if(req.query.tag){
        filter['tags.name'] = req.query.tag
    }

    try {
        let count = await Project.find(filter).estimatedDocumentCount();
        let projects = await Project.find(filter).sort('name').skip(skip).limit(limit);
        
        if(projects && projects.length > 0) {
            res.json({data:projects, count});
        }else {
            res.status(404).json({message: 'No projects found'})
        }

    } catch (error) {
        console.log(error);
    }
});


// for reference
// router.get('/', (req,res) => {

//     let skip = parseInt(req.query.skip) || 0;
//     let limit = parseInt(req.query.limit) || 0;

//   Project.find({})
//         .estimatedDocumentCount()
//         .then((count) => {
//             Project.find({})
//                 .sort('name')
//                 .skip(skip)
//                 .limit(limit)
//                 .then((projects) => {
//                     if(projects && projects.length > 0){
//                         res.json({data:projects, count})
//                     }else {
//                         res.status(404).json({message: 'No projects found'})
//                     }
//                 }).catch(err => console.log(err));
//             }).catch(err => console.log(err))
// });



module.exports = router;