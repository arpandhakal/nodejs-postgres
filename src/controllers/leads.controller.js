const db = require("../models/index");
const {
  createLeadsSchema,
} = require("../utils/validators/create-leads.validator");
const leads = db.leads;
const Op = db.Sequelize.Op;
const { findLeadsSchema } = require("../utils/validators/find-leads.validator");
const {
  findNumberofLeadsSchema,
} = require("../utils/validators/leads-status-source-number.validator");
const {
  updateLeadsSchema,
} = require("../utils/validators/update-leads.validator");

exports.create = async (req, res) => {
  try {
    const { lead_name, email, lead_status, source } = req.body;

    await createLeadsSchema.validate({
      lead_name,
      email,
      lead_status,
      source,
    });
    const result = await leads.create({
      lead_name,
      email,
      lead_status,
      source,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { page, limit, from, to } = req.query;
    await findLeadsSchema.validate({
      page,
      limit,
      from,
      to,
    });
    const query = {};
    if (from) {
      query.added_date = {
        [Op.gte]: new Date(from),
      };
    }
    if (to) {
      query.added_date = {
        ...query.added_date,
        [Op.lte]: new Date(to),
      };
    }

    const result = await leads.findAll({
      where: query,
      offset: (page - 1) * limit,
      limit: limit,
    });
    const totalCount = await leads.count({ where: query });

    res.status(200).json({
      count: totalCount,
      currentPage: page,
      totalPage: Math.ceil(totalCount / limit),
      data: result,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.update = async (req, res) => {
  try {
    const { lead_name, email, lead_status, source } = req.body;
    const { id } = req.params;

    const lead = await leads.findOne({ where: { lead_id: id } });
    if (!lead) {
      throw "no lead found with the provided id";
    }

    await updateLeadsSchema.validate({
      id,
      lead_name,
      email,
      lead_status,
      source,
    });
    const result = await lead.update(
      {
        lead_name,
        email,
        lead_status,
        source,
      },
      { returning: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteLeads = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await leads.findOne({ where: { lead_id: id } });
    if (!lead) {
      throw "no lead found with the provided id";
    }

    const result = await lead.destroy();

    res.status(200).json({ message: " lead deleted succesfullt" });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.findNumbers = async (req, res) => {
  try {
    const { lead_status, source } = req.query;
    const query = {};
    if (lead_status) {
      query.lead_status = lead_status;
    }
    if (source) {
      query.source = source;
    }
    await findNumberofLeadsSchema.validate({
      lead_status,
      source,
    });
    const totalCount = await leads.count({ where: query });
    res.status(200).json({
      count: totalCount,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
