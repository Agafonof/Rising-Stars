const express = require('express');
const { Room } = require('../db/models');

const roomRouter = express.Router();

roomRouter.route('/')
    .post(async (req, res) => {
        try {
            const { pin } = req.body;
            const userid = req.session.user.id;
            await Room.create({ pin, userid });
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500)
            console.log(error);
        }
    })





module.exports = roomRouter