// // src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminDashboard, addProduct, showProduct, deleteProduct, updateProduct, detailsProduct} = require("../controllers/admin.controller.js");
const { auth, checkAdmin } = require('../middlewere/auth.js');

router.route("/admin/add-product").post(auth, checkAdmin, addProduct)
router.route("/admin/add-product").get(auth,checkAdmin, showProduct)

router.route("/admin/show-product/:id").get(auth, checkAdmin, detailsProduct)

router.route("/admin/delete-product/:id").delete(auth, checkAdmin, deleteProduct)

router.route("/admin/update-product/:id").put(auth, checkAdmin, updateProduct)


router.route("/admin").get(auth, checkAdmin,adminDashboard)

module.exports = router;
