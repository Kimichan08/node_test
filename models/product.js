const conn = require('../database/connect');

const product = {
    getAll: (cb) => {
        return conn.query(`SELECT san_pham.*,danh_muc.ten_danh_muc as ten_danh_muc FROM san_pham join danh_muc on san_pham.ma_danh_muc = danh_muc.id`, cb);
    },

    create: (data, filename, cb) => {

        return conn.query(`INSERT INTO san_pham (ten_sp,anh_sp,gia_sp,gia_km,ma_danh_muc) VALUES ('${data.ten_sp}','${filename}','${data.gia_sp}','${data.gia_km}','${data.ma_danh_muc}') `, cb);
    },

    filter: async (ten_sp, anh_sp, gia_sp, gia_km, ma_danh_muc) => {
        let check = await conn.query(`SELECT * FROM san_pham WHERE ten_danh_muc = '${ten_sp}','${anh_sp}','${gia_sp}','${gia_km}','${ma_danh_muc}'`);
        console.log(check);
    }
}

module.exports = product;