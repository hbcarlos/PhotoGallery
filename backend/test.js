const db = require('./db/database.js');

db.createEvent({name:'hello', date:'2019-04-23'})
.then(res => {
  console.log("********************  RESULTADO  ***************************")
  console.log(res);
});