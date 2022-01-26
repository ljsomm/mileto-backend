const Course = require("../models/Course");
const User = require('../models/User');
const UserCourse = require('../models/UserCourse');
const Thumbnail = require('../models/Thumbnail');
const fs = require('fs');

module.exports = {
    index: async (req, res) => {
        res.json(await Course.findAll({include: ['Images', 'Users']}));
    },
    store: async (req, res) => {
        const { id } = req.headers;
        const { name, description } = req.body;
        const user = await User.findByPk(id);
        const course = await Course.create({name, description});
        const path = req.file ? req.file.path : './public/default-thumbnail.jpg';
        await course.createImage({ path });
        try{
            await user.addCourse(course);
            res.json(await Course.findByPk(course.id, { include: ['Images', 'Users'] }));
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    subscribe: async (req, res) => {
        const userId = req.headers.id;
        const courseId = req.params.id;
        if(!(await UserCourse.count({ where: {userId, courseId} }))){
            const user = await User.findByPk(userId);
            const course = await Course.findByPk(courseId);
            return res.json(await course.addUser(user, { through: { admin: false }}));
        }
        else{
            res.status(400).json({err: "Usuário já cadastrado neste curso"});
        }
    },
    update: async (req, res) => {
        const userId = req.headers.id;
        const courseId = req.params.id;
        const { name, description } = req.body;
        const userCourse = await UserCourse.findOne({ where: { userId, courseId } });
        if(userCourse && userCourse.admin){
            const course = await Course.findByPk(userCourse.courseId, {include: 'Images'});
            course.name = name;
            course.description = description;
            const thumbnail = await Thumbnail.findByPk(course.Images[0].id);
            if(thumbnail.path !== './public/default-thumbnail.jpg'){
                fs.unlinkSync(thumbnail.path);
            }
            req.file ? thumbnail.path = req.file.path : thumbnail.path = './public/default-thumbnail.jpg';
            await thumbnail.save();
            await course.save();
            res.json(await Course.findByPk(courseId, { include: 'Images' }));
        }
        else{
            res.status(401).json({ err: "Curso não encontrado ou Usuário inexistente/não autorizado" });
        }
    },
    delete: async (req, res) => {
        const userId = req.headers.id;
        const courseId = req.params.id;
        const userCourse = await UserCourse.findOne({ where: {userId, courseId} });
        if(userCourse && userCourse.admin){
            const course = await Course.findByPk(courseId);
            const thumbnail = await Thumbnail.findOne({where: { courseId }});
            fs.unlinkSync(thumbnail.path);
            await thumbnail.destroy();
            const userCourse = await UserCourse.findAll({ where: { courseId } });
            for(let item of userCourse){
                await course.removeUser(await User.findByPk(item.userId));
            }
            res.json(await course.destroy());
        }
        else{
            res.status(403).json({ err: "Curso não encontrado ou Usuário inexistente/não autorizado" });
        }
     } 
}