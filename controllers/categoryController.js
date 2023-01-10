const category = require("../models/category");
const Joi = require('joi');
const categoryController = {
    index:(req,res)=>{
        category.getAll((err,data)=>{
            if(err){
                res.send(new Error(err));
            } else{
            
                res.render('admin/category',{data});
            }
        })
       
    },

    add :(req,res)=>{

        res.render('admin/category-add');
    },

    create: async (req,res)=>{
        const unique = (value,helpers)=>{
           
            category.filter(value,(err,data)=>{
                console.log(data);
                if(data.length >0){
                    return helpers.error('Đã tồn tài');
                }
                return value;
            })
            return value;
        };

        const schema = Joi.object({
            ten_danh_muc: Joi.string().min(3).max(100).required().custom(unique),

        });
        
       
        try {
            const value = await schema.validateAsync({ ten_danh_muc: req.body.ten_danh_muc});
            category.create(req.body,(err,data)=>{
                if(err){
                    res.send(err);
                } else{
                    res.redirect('/admin/category');
                }
            })
        }
        catch (err) { 
            let errs = err.details;
            res.render('admin/category-add',{errs});
        }
       
    }
}
module.exports = categoryController;