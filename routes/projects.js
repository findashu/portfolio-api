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


router.get('/:id', (req,res, next) => {
    let id = req.params.id;

    Project.findById(id).then((project) => {
        if(project ) {
            res.json({'message': 'Project found', data:project})
        }else {
            res.status(404).json({'message': `Not found with id ${id}`})
        }
    }).catch(err => console.log(err)) 
});

router.put('/:id', (req,res, next) => {
    let id = req.params.id;
    let projectObj =  req.body;

    Project.findByIdAndUpdate(id, {$set: projectObj, $inc: {__v:1} }, {new:true})
        .then((project) => {
            res.json({data:project})
        }).catch(err => next(err))
})


router.delete('/:id', (req,res,next) => {
    let id = req.params.id;

    Project.findByIdAndRemove(id).then((project) => {
        res.status(204).json({message:'Project deleted', data:project});
    }).catch(err => next(err))
})

router.get('/alias/:alias', (req,res,next) => {
    let alias = req.params.alias;
    
    Project.findOne({alias: alias}).then((project) => {
        res.json({data:project})
    }).catch(err => next(err))
});



module.exports = router;