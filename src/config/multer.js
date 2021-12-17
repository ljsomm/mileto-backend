const multer = require("multer");
const fs = require('fs');

module.exports = {
    user:{
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                
                fs.mkdir(process.env.UPLOAD_PATH, { recursive: true } , () => {
                    cb(null, process.env.UPLOAD_PATH);
                });
            },
            filename: (req, file, cb) => {
                cb(null, `${(Date.now()).toString()}-${file.originalname}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'image/jpeg',
                'image/png'
            ];
            if(!allowedMimes.find(item=>{return item === file.mimetype;})){
                cb(null, false);
            }
            else{
                cb(null, true);
            }
        }
    }
}