module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('scores', ['username'], {
      type: 'foreign key',
      name: 'custom_fkey_score_username_relation',
      references: { // Required field
        table: 'users',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('score', 'custom_fkey_score_username_relation');
  },
};
