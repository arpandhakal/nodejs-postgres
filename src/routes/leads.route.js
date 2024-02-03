const express = require("express");
const { findAll } = require("../controllers/leads.controller");
const router = express.Router();

router.route("/findAll").get(findAll);

module.exports = router;
