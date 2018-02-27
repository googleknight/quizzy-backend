module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define('score', {
    username: DataTypes.STRING,
    correct: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return score;
};
