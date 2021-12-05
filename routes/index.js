const express = require('express');
const router = express.Router();

router.use(require("./employee-routes"));
router.use(require("./department-routes"));
router.use(require("./role-routes"));

module.exports = router;