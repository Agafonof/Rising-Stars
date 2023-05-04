const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../db/models');

const profileRouter = express.Router();

profileRouter.patch('/', async (req, res) => {
  const userId = req.session.user.id; // ID пользователя, который хочет изменить свои данные
  const { newpass, newname } = req.body; // Новый пароль и имя
  
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверяем, что оба поля заданы
    if (!newpass || !newname) {
      return res
        .status(400)
        .json({ error: 'Both password and name are required' });
    }

    // Хешируем новый пароль
    const passwordHash = await bcrypt.hash(newpass, 3);

    // Обновляем данные пользователя в базе
    user.hashpass = passwordHash;
    user.name = newname;
    await user.save();

    // Отправляем обновленные данные пользователя в ответе
    return res.json({ name: user.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = profileRouter;