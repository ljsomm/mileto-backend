
const Course = require("../models/Course");
const Section = require("../models/Section");
const UserCourse = require("../models/UserCourse");
const fs = require("fs");
const Video = require("../models/Video");
const UserVideo = require("../models/UserVideo");

module.exports = {
    index: async (req, res) => {
        res.json(await Section.findAll());
    },
    show: async (req, res) => {
        const courseId = req.params.id;
        res.json(await Section.findAll({ where: { courseId: courseId }, include: ['Videos', 'Courses'] }));
    },
    store: async (req, res) => {
        const userId = req.headers.id;
        const { courseId } = req.params;
        const userCourse = await UserCourse.findOne({ where: { courseId, userId } });
        if(userCourse && userCourse.admin){
            const course = await Course.findByPk(courseId);
            const { name } = req.body;
            const section = await course.createSection({ name });
            res.json(await Section.findByPk(section.id, { include: 'Courses' }));
        }
        else{
            res.status(401).json({ err: "Curso não encontrado ou Usuário inexistente/não autorizado" });
        }
    },
    update: async (req, res) => {
        const userId = req.headers.id;
        const { sectionId } = req.params;
        const { name } = req.body;
        const section = await Section.findByPk(sectionId);
        if(section){
            const userCourse = await UserCourse.findOne({ where: { userId, courseId: section.courseId } });
            if(userCourse && userCourse.admin){
                section.name = name;
                res.json(await section.save());
            }
            else{
                res.status(401).json({ err: "Curso não encontrado ou Usuário inexistente/não autorizado" });
            }
        }
        else{
            res.status(403).json({ err: "Seção não encontrada" });
        }
    },
    delete: async (req, res) => {
        const userId = req.headers.id;
        const { sectionId } = req.params;
        const section = await Section.findByPk(sectionId, { include: 'Videos' });
        if(section){
            if(section.Videos.length != 0){
                for(let item of section.Videos){
                    fs.unlinkSync(item.path);
                    const video = await Video.findByPk(item.id);
                    const userVideo = await UserVideo.findAll({ where: { videoId: video.id } });
                    if(userVideo.length != 0){
                        for(let assoaciaton of userVideo){
                            await assoaciaton.destroy();
                        }
                    }
                    await video.destroy();
                }
            }
            const userCourse = await UserCourse.findOne({ where: { userId, courseId: section.courseId } });
            if(userCourse && userCourse.admin){
                res.json(await section.destroy());
            }
            else{
                res.status(401).json({ err: "Curso não encontrado ou Usuário inexistente/não autorizado" });
            }
        }
        else{
            res.status(400).json({ err: "Seção não encontrada" });
        }
    }

}
