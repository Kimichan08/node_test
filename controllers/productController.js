const product = require("../models/product");
const category = require("../models/category");
let multer = require("multer");
const Joi = require('joi');

let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Định nghĩa nơi file upload sẽ được lưu lại
        callback(null, "./public/uploads");
    },
    filename: (req, file, callback) => {
        // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
        // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
        let math = ["image/png", "image/jpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `Tệp <strong>${file.originalname}</strong> không hợp lệ. Chỉ cho phép đuôi mở rộng jpeg + png.`;
            return callback(errorMess, null);
        }

        // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
        let filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

// Khởi tạo middleware uploadFile với cấu hình như ở trên,
// Bên trong hàm .single() truyền vào name của thẻ input, ở đây là "file"
let uploadFile = multer({ storage: diskStorage }).single("anh_sp");

const productController = {
    index: (req, res) => {
        product.getAll((err, prod) => {
            if (err) {
                res.send(new Error(err));
            } else {

                res.render('admin/product/product', { prod });
            }
        })

    },

    add: (req, res) => {
        category.getAll((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.render('admin/product/product-add', { categories: data });
            }
        })
    },

    create: (req, res) => {
        uploadFile(req, res, (error) => {
            // Nếu có lỗi thì trả về lỗi cho client.
            // Ví dụ như upload một file không phải file ảnh theo như cấu hình của mình bên trên
            if (error) {
                return res.send(`Có lỗi khi cố tải tệp hình ảnh lên máy chủ: ${error}`);
            }

            console.log(`------Request body-----`);
            console.log(req.body);

            console.log(`------Request file-----`);
            console.log(req.file);

            console.log(`------Test Done-----`)

            product.create(req.body, req.file.filename, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/admin/product');
                }
            })
        });


    }
}
module.exports = productController;