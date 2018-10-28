let router = require('express').Router();
let User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

function signToken(object) {
    return jwt.sign({user:object}, config.appSecret , {expiresIn: config.expireTime})
}

router.get('/', (req,res) => {
    res.send('Welcome to Portfolio Api')
});

router.post('/signup', (req,res) => {
    let data = req.body;
    let newUser = new User(data);

    newUser.validate(function(err) {
        if(err) {
           return res.status(400).json({message:'Something went wrong', err})
        }
    }); 

    newUser.save().then(user => {
        res.status(201).json({'message':'User created successfully', data:user})
    }).catch(err => console.log(err));
});

router.post('/login', (req,res) => {
    let email = req.body.email;
    let password = req.body.password

    if(!email || !password) {
       return res.status(400).json({message:"Email & password needed"})
    };

    User.findOne({email : email})
        .then((user) => {
            if(!user) {
                res.status(401).json({'message':"No user with given email"})
            }else {
                if(!user.authenticate(password)) {
                    res.status(401).json({message:'Wrong Password'})
                }else {
                     user.password = ''
                    let token = signToken(user);
                    res.json({message:'Successfully logged in',token:token})
                }
            }
        })
})


module.exports = router;