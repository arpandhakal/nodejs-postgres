const express = require("express");
const { findAll } = require("../controllers/leads.controller");
const { create } = require("../controllers/leads.controller");
const router = express.Router();
const { update, deleteLeads } = require("../controllers/leads.controller");

router.route("/findAll").get(findAll);
router.route("/create").post(create);
router.route("/update/:id").patch(update);
router.route("/delete/:id").delete(deleteLeads);

module.exports = router;
