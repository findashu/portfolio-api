const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./routes/index')
const project = require('./routes/projects');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portfolio-api', {useNewUrlParser:true}).then(
    success => console.log('connected with db'),
    err => console.log('Issue connecting with database')
);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index);
app.use('/projects', project);


app.use(function(err, req,res,next) {
    res.status(500).json({message:err.message})
})

app.listen(3003, () => console.log('Server started on port 3003'))