module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('options', ['questionId'], {
      type: 'foreign key',
      name: 'custom_fkey_questionId_relation',
      references: { // Required field
        table: 'questions',
        field: 'questionId',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('options', 'custom_fkey_questionId_relation');
  },
};
