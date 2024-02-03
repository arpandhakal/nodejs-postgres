const db = require("../models/index");
const leads = db.leads;
const Op = db.Sequelize.Op;
const { findLeadsSchema } = require("../utils/validators/find-leads.validator");

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
    res.status(400).json(err.message);
  }
};
