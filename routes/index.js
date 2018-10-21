let router = require('express').Router();
let User = require('../model/user');


router.get('/', (req,res) => {
    res.send('Welcome to Portfolio Api')
});

router.post('/signup', (req,res) => {
    let data = req.body;
    let newUser = new User(data);
    newUser.save().then(user => {
        res.status(201).json({'message':'User created successfully', data:user})
    }).catch(err => console.log(err));
});


module.exports = router;