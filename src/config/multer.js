const multer = require("multer");
const fs = require('fs');
const allowedVideoMimes = [
    'video/mp4'
];
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
   },
   video: {
       storage: multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync(process.env.VIDEO_UPLOAD_PATH, {recursive: true });
            cb(null, process.env.VIDEO_UPLOAD_PATH);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
       }),
       fileFilter: (req, file, cb) => {
           allowedVideoMimes.find(item => file.mimetype === item) ? cb(null, true) : cb(null, false);
       }
   }
}
