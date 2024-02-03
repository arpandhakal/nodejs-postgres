const express = require("express");
const { findAll, findNumbers } = require("../controllers/leads.controller");
const { create } = require("../controllers/leads.controller");
const router = express.Router();
const { update, deleteLeads } = require("../controllers/leads.controller");

router.route("/find-all").get(findAll);
router.route("/create").post(create);
router.route("/update/:id").patch(update);
router.route("/delete/:id").delete(deleteLeads);
router.route("/find-numbers").get(findNumbers);

module.exports = router;
