module.exports = (sequelize, DataTypes) => {
  const options = sequelize.define('options', {
    questionId: DataTypes.INTEGER,
    option: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return options;
};
