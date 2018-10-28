const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// var plainText = 'shivangi';

// var salt = bcrypt.genSaltSync(10);

// console.log(salt);


// var hashCode = bcrypt.hashSync(plainText, salt);

// console.log(hashCode);


// var pass = bcrypt.compareSync(plainText, '$2b$10$sI5Pe0f/16UV6rYOTEK6v.9iPt0HJOLy8wjqPKI4gVecK7ad4VV6');


// console.log(pass)

let secret ='mysupersecret'

let token = jwt.sign({name:'shivangi'},secret, {expiresIn: 60} );

console.log(token);

let decode = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpdmFuZ2kiLCJpYXQiOjE1NDA3MzYwMjgsImV4cCI6MTU0MDczNjA4OH0.TJf1M-BFvrTaznEPW4Bnf2EOFQfMfmgfzZYHJV5UjjU', secret);

console.log(decode);



