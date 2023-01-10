const conn = require('../database/connect')
const category = require('../models/category');
const homeController = {
    index:(req,res)=>{
        category.getAll((err,result)=>{
            if(err){
                res.send(errr);
            } else{
                res.render('home',{result});
            }
        })
       
    },
    about:(req,res)=>{
        res.send("Trang about");
    },
}
module.exports = homeController;