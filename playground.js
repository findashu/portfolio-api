const bcrypt = require('bcrypt');

var plainText = 'shivangi';

var salt = bcrypt.genSaltSync(10);

console.log(salt);


var hashCode = bcrypt.hashSync(plainText, salt);

console.log(hashCode);


var pass = bcrypt.compareSync(plainText, '$2b$10$sI5Pe0f/16UV6rYOTEK6v.9iPt0HJOLy8wjqPKI4gVecK7ad4VV6');


console.log(pass)
