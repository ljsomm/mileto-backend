const userRouter = require('./userRouter');
const courseRouter = require('./courseRouter');

module.exports = app => {
    app.use(userRouter);
    app.use(courseRouter);
}