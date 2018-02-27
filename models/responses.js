module.exports = (sequelize, DataTypes) => {
  const responses = sequelize.define('responses', {
    questionId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    selectedOption: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return responses;
};
