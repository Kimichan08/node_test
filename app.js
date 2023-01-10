const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public/uploads"));
require('./routes/index')(app);
require('./routes/admin')(app);

app.listen(3000,()=>{

});
