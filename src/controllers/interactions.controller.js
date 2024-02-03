const db = require("../models/index");
const {
  createInteractionsSchema,
} = require("../utils/validators/create-interactions.validator");
const {
  updateInteractionsSchema,
} = require("../utils/validators/update-interactions.validator");
const Op = db.Sequelize.Op;
const interactions = db.interactions;
const leads = db.leads;
const sequelize = db.sequelize;

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { interaction_type, interaction_date } = req.body;
    const { id } = req.params;
    const lead = await leads.findOne({ where: { lead_id: id } });
    if (!lead) {
      throw "no lead found with the provided id";
    }
    const lead_id = id;
    await createInteractionsSchema.validate({
      interaction_type,
      interaction_date,
    });
    const result = await interactions.create(
      {
        lead_id,
        interaction_type,
        interaction_date,
      },
      { transaction: t }
    );
    await leads.update(
      {
        lead_status: "Contacted",
      },
      {
        where: {
          lead_id: id,
          lead_status: "New",
        },
        transaction: t,
      }
    );
    await t.commit();

    res.status(201).json(result);
  } catch (err) {
    await t.rollback();
    res.status(400).json(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await interactions.findAll({
      where: {
        lead_id: id,
      },
    });
    const totalCount = await interactions.count({
      where: {
        lead_id: id,
      },
    });

    res.status(200).json({
      count: totalCount,
      data: result,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { interaction_type } = req.body;
    const { id } = req.params;

    const interaction = await interactions.findOne({
      where: { interaction_id: id },
    });
    if (!interaction) {
      throw "no interaction found with the provided id";
    }
    await updateInteractionsSchema.validate({
      interaction_type,
    });

    const result = await interaction.update(
      {
        interaction_type,
      },
      { returning: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteInteraction = async (req, res) => {
  try {
    const { id } = req.params;

    const interaction = await interactions.findOne({
      where: { interaction_id: id },
    });
    if (!interaction) {
      throw "no interaction found with the provided id";
    }

    const result = await interaction.destroy();

    res.status(200).json({ message: " interaction deleted succesfullt" });
  } catch (err) {
    res.status(400).json(err);
  }
};
