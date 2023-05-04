'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
 
   await queryInterface.bulkInsert('Questions', [{
     text: 'У кого самые красивые глаза?'
    },{
      text: 'У кого самые длинные волосы?'
     },{
      text: 'У кого самые маленькие уши?'
     },{
      text: 'У кого самые большие уши?'
     },{
      text: 'У кого самые короткие волосы?'
     },{
      text: 'У кого самый милый взгляд?'
     },{
      text: 'У кого самая милая улыбка?'
     },{
      text: 'Кто самый сонный?'
     },{
      text: 'У кого самые большой нос?'
     },{
      text: 'У кого самое стройное лицо?'
     },{
      text: 'Кто самый небритый?'
     },{
      text: 'Кто самый стройный?'
     },{
      text: 'Кто самый толстый?'
     },{
      text: 'У кого самое смешное лицо?'
     },{
      text: 'У кого самый пронзительный взгляд?'
     },{
      text: 'Самый маленький рот?'
     },{
      text: 'Самые смешные зубы?'
     },{
      text: 'Самый задумчивый?'
     },
     {
      text: 'Самый самый?'
     },
  ], {});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
