const homeController = require('../controllers/homeController');


const index = (app)=>{
    app.get('/',homeController.index),
    app.get('/about',homeController.about)
}
module.exports = index;         