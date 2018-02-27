module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('answers', ['questionId'], {
      type: 'foreign key',
      name: 'custom_fkey_answers_questionId_relation',
      references: { // Required field
        table: 'questions',
        field: 'questionId',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('answers', 'custom_fkey_answers_questionId_relation');
  },
};
