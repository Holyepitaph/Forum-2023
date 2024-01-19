const bcrypt = require('bcrypt')
const router = require('express').Router()
const Image = require('../models/image')

const { tokenExtractor, isAdmin } = require('../util/middleware')


//  Adds new categoryItem with itemId,categoryId
  router.post('/post/:id',tokenExtractor, async (req, res) => {
    try {
        console.log(req.files)
        if (!req.files) {
            res.send({
                status: "failed",
                message: "No file uploaded",
            });
        } else {
            let file = req.files[0];
            const regEx = /.jpeg|.jpg|.gif|.png|.webp/
            const name = file.name.match(regEx)
            file.mv(__dirname + '/uploads/' + req.params.id + name);
            await Image.create({})
            res.send({
                status: "success",
                message: "File is uploaded",
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
  })

//  Adds new categoryItem with itemId,categoryId
router.get('/down', async (req, res) => {
    try{
        const total = await Image.findAll({})
        res.send(total)
    }catch{
     return res.status(400).json({error})
    }
     })



module.exports = router