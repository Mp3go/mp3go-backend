const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/cart", userController.getCart);

// router.get('/wishlist', userController.getWishlist);
// //send albumId through req body
router.post("/cart", userController.postCartItem);

router.post("/cart/qty", userController.cartqtyController);

router.delete("/cart-delete-item", userController.deleteCartItem);
// // send albumId
router.post("/wishlist", userController.postWishlistItem);

router.delete("/wishlist-delete-item", userController.deleteWishlistItem);

//modify cart by qty?
//No wishlist remove option?
module.exports = router;
