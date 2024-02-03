module.exports = (sequelize, Sequelize) => {
  const interactions = sequelize.define("interactions", {
    interaction_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lead_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "leads",
        key: "lead_id",
      },
    },
    interaction_type: {
      type: Sequelize.ENUM("Email", "Call", "Meeting"),
      allowNull: false,
    },
    interaction_date: {
      type: Sequelize.DATE,
    },
  });

  return interactions;
};
