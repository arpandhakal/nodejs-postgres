module.exports = (sequelize, Sequelize) => {
  const leads = sequelize.define("leads", {
    lead_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lead_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    lead_status: {
      type: Sequelize.ENUM("New", "Contacted", "Qualified", "Lost"),
      allowNull: false,
    },
    source: {
      type: Sequelize.ENUM("Web", "Referral", "Partner"),
      allowNull: false,
    },
    added_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });

  return leads;
};
