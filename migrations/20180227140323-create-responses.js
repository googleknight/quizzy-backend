module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('responses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    questionId: {
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
    },
    selectedOption: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('responses'),
};
