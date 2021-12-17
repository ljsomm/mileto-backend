const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Image = require('../models/Image');
const Gender = require('../models/Gender');

module.exports = {
    index: async (req, res) => {
        res.json(await User.findAll({ include: ['Images', 'Genres'] }));
    },
    show: async (req, res) => {
        const { id } = req.headers;
        res.json(await User.findByPk(id, { include: ['Images', 'Genres'] }));
    },
    create: async (req, res) => {
        const { name, birthDate, email, password, abbreviation, customName = null, treatment = null } = req.body;
        try{
            const user = await User.create({ name, birthDate, email, password });
            const filePath = req.file ? req.file.path : 'public/default-profile.png';
            await user.createImage({ path: filePath });
            await user.createGenre({ abbreviation, customName, treatment });
            res.json(await User.findByPk(user.id, { include: ['Images', 'Genres'] }));
        }
        catch(err){
            switch(err.name){
                case 'SequelizeValidationError':
                    return res.status(406).json({
                        err: 'A requisição não contém todos os dados necessários'
                    });
                case 'SequelizeUniqueConstraintError':
                    return res.status(406).json({
                        err: 'E-mail já cadastrado'
                    });
            }
        }
    },
    update: async (req, res) => {
        const { id } = req.headers;
        const { name, birthDate, email, password, abbreviation, customName = null, treatment = null } = req.body;
        const user = await User.findByPk(id, {include:['Images', 'Genres']});
        const image = await Image.findByPk(user.Images[0].id);
        const gender = await Gender.findByPk(user.Genres[0].id);
        user.name = name;
        user.birthDate = birthDate;
        user.email = email;
        user.password = password;
        gender.abbreviation = abbreviation;
        gender.customName = customName;
        gender.treatment = treatment;
        if(req.file){
            if(image.path !== 'public/default-profile.png'){
                fs.unlink(image.path, async () => {
                    image.path = req.file.path;
                    await image.save();
                    await user.save();
                    await gender.save();
                    res.json(await User.findByPk(id, {include: ['Images', 'Genres']}));
                });
            }
            else{
                image.path = req.file.path;
                await image.save();
                await user.save();
                await gender.save();
                res.json(await User.findByPk(id, {include: ['Images', 'Genres']}));
            }
        }
        else{
            fs.unlink(image.path, async () => {
                image.path = 'public/default-profile.png';
                await image.save();
                await user.save();
                await gender.save();
                res.json(await User.findByPk(id, {include: ['Images', 'Genres']}));
            });
        } 
    },
    delete: async (req, res) => {
        const { id } = req.headers;
        const user = await User.findByPk(id, {
            include: ['Images','Genres']
        });
        const image = await Image.findByPk(user.Images[0].id);
        const gender = await Gender.findByPk(user.Genres[0].id);
        if(image.path !== 'public/default-profile.png'){
            fs.unlink(image.path, async () => {
                await image.destroy();
                await gender.destroy();
                res.json(await user.destroy()); 
            })
        }
        await image.destroy();
        await gender.destroy();
        res.json(await user.destroy()); 
    },
    auth: async (req, res) => {
        const { email, password } = req.body;
        try{
            const user = await User.findOne({where: { email, password }});
            if(user){
                const { id } = user;
                const token = jwt.sign({ id }, process.env.SECRET);
                res.json({ token });
            }
            else{
                res.status(401).json({ err: "Usuário não encontrado no sistema" });
            }
        }
        catch(err){
            res.status(500).json({ err: 'Algum erro inesperado aconteceu' });
        }
    }
}