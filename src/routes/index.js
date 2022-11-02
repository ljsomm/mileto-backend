const userRouter = require('./userRouter');
const courseRouter = require('./courseRouter');
const sectionRouter = require('./sectionRouter');
const videoRouter = require('./videoRouter');

module.exports = app => {
    app.use(userRouter);
    app.use(courseRouter);
    app.use(sectionRouter);
    app.use(videoRouter);
  
}