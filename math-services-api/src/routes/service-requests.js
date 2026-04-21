const express = require("express");
const router = express.Router();
const service_requests_controller = require("../controllers/serviceRequestsController");

router.get("/", service_requests_controller.get_all_service_requests);
router.get("/:id", service_requests_controller.get_service_request_by_id);
router.post("/", service_requests_controller.create_service_request);
router.patch("/:id", service_requests_controller.update_service_request);
router.delete("/:id", service_requests_controller.delete_service_request);

module.exports = router;
