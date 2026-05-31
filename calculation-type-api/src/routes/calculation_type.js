const express = require("express");
const router = express.Router();
const calculation_type_controller = require("../controllers/calculation_type_controller");

router.get("/", calculation_type_controller.get_all_calculation_types);
router.get("/:id", calculation_type_controller.get_calculation_type_by_id);
router.post("/", calculation_type_controller.create_calculation_type);
router.patch("/:id", calculation_type_controller.update_calculation_type);
router.delete("/:id", calculation_type_controller.delete_calculation_type);

module.exports = router;
