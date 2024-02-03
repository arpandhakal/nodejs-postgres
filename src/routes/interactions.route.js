const express = require("express");
const {
  create,
  findAll,
  update,
  deleteInteraction,
} = require("../controllers/interactions.controller");
const router = express.Router();

router.route("/create/:id").post(create);
router.route("/findAll/:id").get(findAll);
router.route("/update/:id").patch(update);
router.route("/delete/:id").delete(deleteInteraction);

module.exports = router;
