const express = require("express");
const paymentController = require("../controllers/payment");

const router = express.Router();

// //send albumId through req body
router.post("/checkout", paymentController.checkout);
router.post("/verify", paymentController.verifyPayment);
//modify cart by qty?
//No wishlist remove option?
module.exports = router;
