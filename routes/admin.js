const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");

const admin = (app)=>{
    app.get('/admin',adminController.index);
    app.get('/admin/category',categoryController.index);
    app.get('/admin/category-add',categoryController.add);
    app.post('/admin/category-add',categoryController.create);

    // product
    app.get('/admin/product',productController.index);
    app.get('/admin/product/product-add',productController.add);
    app.post('/admin/product/product-add',productController.create);
  
}
module.exports = admin;         