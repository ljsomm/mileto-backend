const multer = require("multer");
const fs = require('fs');
const allowedImageMimes = [
    'image/jpeg',
    'image/png'
];

module.exports = {
    user:{
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                fs.mkdir(process.env.USER_UPLOAD_PATH, { recursive: true } , () => {
                    cb(null, process.env.USER_UPLOAD_PATH);
                });
            },
            filename: (req, file, cb) => {
                cb(null, `${(Date.now()).toString()}-${file.originalname}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            if(!allowedImageMimes.find(item=>{return item === file.mimetype;})){
                cb(null, false);
            }
            else{
                cb(null, true);
            }
        }
    },
    course: {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                fs.mkdir(process.env.COURSE_UPLOAD_PATH, { recursive: true }, () => {
                    cb(null, process.env.COURSE_UPLOAD_PATH);
                });
            },
            filename: (req, file, cb) => {
                cb(null, `${(Date.now()).toString()}-${file.originalname}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            allowedImageMimes.find(item => item === file.mimetype) ? cb(null, true) : cb(null, false);
            
        }
   }
}
