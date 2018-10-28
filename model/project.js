const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    name:String,
    githubUrl: String,
    alias: String, //slug
    description: String,
    coverImage : String,
    tags : [{
        name: String,
        class: {type:String, enum:['primary', 'info', 'danger'], default:'info'}
    }],
    relatedProjects:[{
        name:String,
        link: String
    }],
    imageSliders: [String],
    createdAt : Date,
    updatedAt : {type: Date, default : new Date()}
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;